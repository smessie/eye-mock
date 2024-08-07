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

const options = { output: "derivations", outputType: "string", bnodeRelabeling: true };

const result = await n3reasoner(data, query, options);
```

### Options

The `options` parameter is optional and can be used to configure the reasoning process. The following options are available:
- `output`: What to output with implicit queries.
  - `none`: no implicit query is passed
  - `derivations`: output only new derived triples, a.k.a `--pass-only-new` (default)
  - `deductive_closure`: output deductive closure, a.k.a `--pass`
  - `deductive_closure_plus_rules`: output deductive closure plus rules, a.k.a `--pass-all`
  - `grounded_deductive_closure_plus_rules`: ground the rules and output deductive closure plus rules, a.k.a `--pass-all-ground`
- `outputType`: The type of output
  - `string`: output as string (default)
  - `quads`: output as array of RDF/JS Quads
- `bnodeRelabeling`: Whether or not to perform bnodeRelabeling
  - `true`: perform bnodeRelabeling (default)
  - `false`: do not perform bnodeRelabeling
