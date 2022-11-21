# eye-mock
EYE mock solving your n3 reasoning on a server instead of client side Prolog execution

## Usage

Install the package via NPM
```
npm install eye-mock
```

Import and use the function in your code
```javascript
import { n3reasoner} from 'eye-mock';

const data = `
@prefix : <urn:example.org:> .
:Alice a :Person .
{ ?S a :Person } => { ?S a :Human } .
`;

const query = `{?S ?P ?O} => {?S ?P ?O}`;

const result = await n3reasoner(data,query);
```

There is also an optional `onlyDerivations` parameter defaulting to `true`.
