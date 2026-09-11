import { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import './ScrollTop.css';

/* Back to top, with a ring showing how far down the page you are.
   Sits bottom-left so it never fights the chat launcher. */
export default function ScrollTop() {
  const [shown, setShown] = useState(false);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setShown(window.scrollY > 600);
      setPct(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  const R = 17;
  const C = 2 * Math.PI * R;

  return (
    <button
      className={`scrolltop${shown ? ' is-shown' : ''}`}
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={shown ? 0 : -1}
    >
      <svg className="scrolltop__ring" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r={R} className="scrolltop__track" />
        <circle
          cx="20"
          cy="20"
          r={R}
          className="scrolltop__fill"
          style={{ strokeDasharray: C, strokeDashoffset: C * (1 - pct) }}
        />
      </svg>
      <FiArrowUp size={16} />
    </button>
  );
}
