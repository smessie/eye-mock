import {Parser} from "n3";

export async function n3reasoner(data, query, options) {
    // Check options
    const unknownOptions = Object.keys(options).filter(
        (key) => !["output", "blogic", "outputType"].includes(key)
    );
    if (unknownOptions.length > 0) {
        throw new Error(
            "Unknown options: " + unknownOptions.join(", ")
        );
    }
    const { output = undefined, blogic = false, outputType = "string" } = options;

    // Check if output is valid
    if (![undefined, "derivations", "deductive_closure", "deductive_closure_plus_rules", "grounded_deductive_closure_plus_rules"].includes(output)) {
        throw new Error("Unknown output option: " + output);
    }

    // Check if outputType is valid
    if (!['string', 'quads'].includes(outputType)) {
        throw new Error(`Invalid outputType: ${outputType}`);
    }

    // Document and query to body of request
    const inputBody = [];
    if (output) {
        inputBody.push(
            `${encodeURIComponent("task")}=${encodeURIComponent(output)}`
        );
    }
    inputBody.push(
        `${encodeURIComponent("system")}=${encodeURIComponent("eye")}`
    );

    // Package only supports input data and query as strings, not as quads. See https://github.com/rdfjs/N3.js/issues/316
    if (typeof data !== 'string') {
        throw new Error('Only string input data is currently supported');
    }
    if (typeof query !== 'string') {
        throw new Error('Only string input query is currently supported');
    }

    inputBody.push(
        `${encodeURIComponent("formula")}=${encodeURIComponent(
            blogic ? data : `${data}\n${query}`
        )}`
    );
    if (blogic) {
        inputBody.push(
            `${encodeURIComponent("blogic")}=${encodeURIComponent(true)}`
        );
    }

    let result = await fetch("https://eye-api.smessie.com/n3", {
        headers: {
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        body: inputBody.join("&"),
        method: "POST",
        credentials: "omit",
    });
    const body = await result.body;
    // Read all the data from the ReadableStream
    const reader = body.getReader();
    const decoder = new TextDecoder();
    let response = "";
    // eslint-disable-next-line no-constant-condition
    while (true) {
        const {done, value} = await reader.read();
        if (done) {
            break;
        }
        response += decoder.decode(value);
    }
    // String to JSON
    const json = JSON.parse(response);

    // Return the result
    if (outputType === "string") {
        return json.success || json.error;
    } else {
        if (json.success) {
            const parser = new Parser({ format: 'text/n3' });
            return parser.parse(json.success);
        } else {
            throw new Error(json.error);
        }
    }
}

export default {
    n3reasoner,
}
