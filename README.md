# rdf-serialize-store.js

Serialise data from any iterable set of quads.

[![GitHub license](https://img.shields.io/github/license/jeswr/rdf-serialize-store.js.svg)](https://github.com/jeswr/rdf-serialize-store.js/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@jeswr/rdf-serialize-store.svg)](https://www.npmjs.com/package/@jeswr/rdf-serialize-store)
[![build](https://img.shields.io/github/actions/workflow/status/jeswr/rdf-serialize-store.js/nodejs.yml?branch=main)](https://github.com/jeswr/rdf-serialize-store.js/tree/main/)
[![Dependabot](https://badgen.net/badge/Dependabot/enabled/green?icon=dependabot)](https://dependabot.com/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Usage

```ts
import { Quad, Store, DataFactory } from 'n3';
import serialize from '@jeswr/rdf-serialize-store';
const { namedNode, literal, quad } = DataFactory;

const quads = [
  quad(namedNode('http://example.org/subject'), namedNode('http://example.org/predicate'), namedNode('http://example.org/object')),
  quad(namedNode('http://example.org/subject'), namedNode('http://example.org/predicate'), literal('object')),
];

// <http://example.org/subject> <http://example.org/predicate> <http://example.org/object>, "object".
await serialize(quads, { contentType: 'text/turtle' });
await serialize(new Store(quads), { contentType: 'text/turtle' });
```

## License
©2024–present
[Jesse Wright](https://github.com/jeswr),
[MIT License](https://github.com/jeswr/rdf-serialize-store.js/blob/master/LICENSE).
