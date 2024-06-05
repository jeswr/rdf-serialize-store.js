import { Quad, Store, DataFactory } from 'n3';
import serialize from '../lib';

const { namedNode, literal, quad } = DataFactory;

function* toIterable(quads: Quad[]) {
  yield* quads;
}

describe('serialize from', () => {
  let quads: Quad[];
  let turtle: string;
  let turtlePrefixed: string;

  beforeEach(() => {
    quads = [
      quad(namedNode('http://example.org/subject'), namedNode('http://example.org/predicate'), namedNode('http://example.org/object')),
      quad(namedNode('http://example.org/subject'), namedNode('http://example.org/predicate'), literal('object')),
    ];
    turtle = '<http://example.org/subject> <http://example.org/predicate> <http://example.org/object>, "object".\n';
    turtlePrefixed = '@prefix ex: <http://example.org/>.\n\nex:subject ex:predicate ex:object, "object".\n';
  });

  it('emtpy list to turtle', async () => {
    await expect(serialize([], { contentType: 'text/turtle' })).resolves.toBe('');
  });

  it('emtpy dataset to turtle', async () => {
    await expect(serialize(new Store(), { contentType: 'text/turtle' })).resolves.toBe('');
  });

  it('emtpy iterable to turtle', async () => {
    await expect(serialize(toIterable([]), { contentType: 'text/turtle' })).resolves.toBe('');
  });

  it('non-emtpy list to turtle', async () => {
    await expect(serialize(quads, { contentType: 'text/turtle' })).resolves.toEqual(turtle);
  });

  it('non-emtpy dataset to turtle', async () => {
    await expect(serialize(new Store(quads), { contentType: 'text/turtle' })).resolves.toEqual(turtle);
  });

  it('non-emtpy iterable to turtle', async () => {
    await expect(serialize(toIterable(quads), { contentType: 'text/turtle' })).resolves.toEqual(turtle);
  });

  it('non-emtpy iterable to turtle with prefix', async () => {
    await expect(serialize(toIterable(quads), { contentType: 'text/turtle', prefixes: { ex: 'http://example.org/' } })).resolves.toEqual(turtlePrefixed);
  });

  it('non-emtpy iterable to turtle with prefix', async () => {
    await expect(serialize(toIterable(quads), { contentType: 'text/turtle', prefixes: { ex: 'http://example.org/', [Symbol('test')]: 'boo' } })).resolves.toEqual(turtlePrefixed);
  });
});
