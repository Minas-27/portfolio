/* Last word in the accent, same split as the name. One word stays ink. */
export function splitTone(text) {
  const words = String(text).trim().split(/\s+/);
  if (words.length < 2) return { lead: String(text).trim(), tail: '' };
  const tail = words.pop();
  return { lead: words.join(' '), tail };
}

export default function Tone({ text }) {
  const { lead, tail } = splitTone(text);
  if (!tail) return lead;
  return <>{lead} <span className="tone-accent">{tail}</span></>;
}
