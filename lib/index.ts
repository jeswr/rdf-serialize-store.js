import { rdfSerializer } from 'rdf-serialize';
import { wrap } from 'asynciterator';
import stringify from '@jeswr/stream-to-string';
import type { Quad } from '@rdfjs/types';

export function serializeToStream(
  quads: Iterable<Quad>,
  options: Parameters<typeof rdfSerializer.serialize>[1] & { prefixes?: Record<string, string> },
) {
  const prefixes = options.prefixes ?? {};
  const stream = wrap(quads, { autoStart: false });

  const { read } = stream;
  stream.read = () => {
    for (const pref in prefixes) {
      if (typeof pref === 'string') stream.emit('prefix', pref, prefixes[pref]);
    }
    stream.read = read;
    return stream.read();
  };
  return rdfSerializer.serialize(stream, options);
}

export default function serialize(...args: Parameters<typeof serializeToStream>) {
  return stringify(serializeToStream(...args));
}
