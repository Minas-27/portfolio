import { useEffect, useState } from 'react';
import { addisNow } from '../lib/ethiopian';

/* Addis Ababa wall time, whatever the visitor's own time zone. */
export default function Clock({ className = '' }) {
  const [now, setNow] = useState(() => addisNow());

  useEffect(() => {
    const tick = () => setNow(addisNow());
    let id;
    // Line up with the minute, then tick once a minute.
    const first = setTimeout(() => {
      tick();
      id = setInterval(tick, 60_000);
    }, 60_000 - (Date.now() % 60_000));
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return (
    <p className={`clock t-meta ${className}`}>
      <span>Addis Ababa</span>
      <time className="tabular">{now.time}</time>
      <span className="clock__sep" aria-hidden="true">/</span>
      <span>{now.gregorian}</span>
      <span className="clock__sep" aria-hidden="true">/</span>
      <span className="clock__eth" title="Today in the Ethiopian calendar">{now.ethiopian}</span>
    </p>
  );
}
