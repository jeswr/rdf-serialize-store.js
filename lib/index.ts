import rdfSerialize from 'rdf-serialize';
import { wrap } from 'asynciterator';
import stringify from 'stream-to-string';
import { Quad } from '@rdfjs/types';

export function serializeToStream(
  quads: Iterable<Quad>,
  options: Parameters<typeof rdfSerialize.serialize>[1],
) {
  return rdfSerialize.serialize(wrap(quads, { autoStart: false }), options);
}

export default function serialize(...args: Parameters<typeof serializeToStream>) {
  return stringify(serializeToStream(...args));
}
