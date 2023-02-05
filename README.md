# eye-mock
EYE mock solving your n3 reasoning on a server instead of client side Prolog execution

## Usage

Install the package via NPM
```
npm install eye-mock
```

Import and use the function in your code
```javascript
import { n3reasoner } from 'eye-mock';

const data = `
@prefix : <urn:example.org:> .
:Alice a :Person .
{ ?S a :Person } => { ?S a :Human } .
`;

const query = `{?S ?P ?O . } => {?S ?P ?O . } .`;

const options = { output: "derivations", blogic: false, outputType: "string" };

const result = await n3reasoner(data, query, options);
```

### Options

The `options` parameter is optional and can be used to configure the reasoning process. The following options are available:
- `output`: What to output with implicit queries.
  - undefined: no implicit query is passed (default)
  - `derivations`: output only new derived triples, a.k.a `--pass-only-new` (default)
  - `deductive_closure`: output deductive closure, a.k.a `--pass`
  - `deductive_closure_plus_rules`: output deductive closure plus rules, a.k.a `--pass-all`
  - `grounded_deductive_closure_plus_rules`: ground the rules and output deductive closure plus rules, a.k.a `--pass-all-ground`
- `blogic`: Whether to use the blogic or not. Used to support [RDF surfaces](https://w3c-cg.github.io/rdfsurfaces/).
  - `true`: use blogic
  - `false`: do not use blogic (default)
- `outputType`: The type of output
  - `string`: output as string (default)
  - `quads`: output as array of RDF/JS Quads
