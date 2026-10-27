import { navFor } from '../lib/sections';
import { splitTone } from './Tone';

/* (01) Label ─────────────────────
   TITLE
   lede                                                */
export default function SectionHead({ id, copy, titleId, lede = copy.subtitle, className = '', children }) {
  const nav = navFor(id);
  const { lead, tail } = splitTone(copy.title);
  return (
    <header className={`shead${className ? ` ${className}` : ''}`}>
      <p className="shead__bar t-label">
        <span className="tabular">({nav.index})</span>
        <span>{copy.label}</span>
      </p>
      <h2 className="shead__title t-title" id={titleId}>
        <span className="js-chars">{lead}</span>
        {tail && <span className="js-chars tone-accent">{tail}</span>}
      </h2>
      {lede && <p className="shead__lede t-lede js-lines">{lede}</p>}
      {children}
    </header>
  );
}
