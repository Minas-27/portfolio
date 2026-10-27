import { useId, useState } from 'react';
import { ScrollTrigger } from '../lib/motion';
import './Expand.css';

/* The one-liner is always there; the full paragraph waits behind a toggle. */
export default function Expand({ summary, detail, points, className = '' }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`expand ${className}${open ? ' is-open' : ''}`}>
      <p className="expand__summary">{summary}</p>
      <div className="expand__panel" id={id}>
        <div>
          <p>{detail}</p>
          {points?.length > 0 && (
            <ul className="expand__points">
              {points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          )}
        </div>
      </div>
      <button
        className="expand__toggle t-meta"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setOpen((o) => !o);
          setTimeout(() => ScrollTrigger.refresh(), 650);
        }}
      >
        <span className="expand__icon" aria-hidden="true"><i /><i /></span>
        {open ? 'Less' : 'More'}
      </button>
    </div>
  );
}
