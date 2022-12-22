export async function n3reasoner(data, query, onlyDerivations = true) {
    // Document and query to body of request
    const inputBody = [];
    inputBody.push(
        `${encodeURIComponent("task")}=${encodeURIComponent(
            onlyDerivations ? "derivations" : "deductive_closure"
        )}`
    );
    inputBody.push(
        `${encodeURIComponent("system")}=${encodeURIComponent("eye")}`
    );

    inputBody.push(
        `${encodeURIComponent("formula")}=${encodeURIComponent(
            `${data}\n${query}`
        )}`
    );

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
    return json.success.replaceAll("http://n3-editor.org/", "#") || json.error;
}

export default {
    n3reasoner,
}
