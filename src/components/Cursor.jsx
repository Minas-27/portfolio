import { useEffect, useRef } from 'react';
import { gsap, reduced } from '../lib/motion';

/* Dot + follower. Grows over anything clickable, fills and shows a
   word over [data-cursor] elements, becomes a caret over text fields,
   and pulls [data-magnetic] elements a little toward the pointer.
   Only on a real mouse, never with reduced motion. */

const CLICKABLE = 'a, button, [role="button"], [data-magnetic], label, summary';
const TEXTY = 'input, textarea, [contenteditable="true"]';

export default function Cursor() {
  const ring = useRef(null);
  const dot = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine || reduced()) return undefined;
    const html = document.documentElement;

    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' });
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'none' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'none' });

    let magnet = null;

    const release = () => {
      if (!magnet) return;
      gsap.to(magnet, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
      magnet = null;
    };

    const onMove = (e) => {
      html.classList.add('has-cursor');
      rx(e.clientX);
      ry(e.clientY);
      dx(e.clientX);
      dy(e.clientY);

      const t = e.target instanceof Element ? e.target : null;
      const texty = t?.closest(TEXTY);
      const labelled = t?.closest('[data-cursor]');
      ring.current.classList.toggle('is-text', !!texty);
      ring.current.classList.toggle('is-label', !!labelled);
      ring.current.classList.toggle('is-hover', !texty && !labelled && !!t?.closest(CLICKABLE));
      if (labelled && label.current) label.current.textContent = labelled.dataset.cursor;

      const m = t?.closest('[data-magnetic]');
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const r = m.getBoundingClientRect();
        const strength = Number(m.dataset.magnetic) || 0.3;
        gsap.to(m, {
          x: (e.clientX - (r.left + r.width / 2)) * strength,
          y: (e.clientY - (r.top + r.height / 2)) * strength,
          duration: 0.4,
          ease: 'power3.out',
        });
      }
    };
    const onDown = () => ring.current.classList.add('is-down');
    const onUp = () => ring.current.classList.remove('is-down');
    const onLeave = () => {
      html.classList.remove('has-cursor');
      release();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      html.classList.remove('has-cursor');
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={ring} aria-hidden="true">
        <span className="cursor__label" ref={label} />
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}
