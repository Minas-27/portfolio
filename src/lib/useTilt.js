import { useRef, useCallback } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

/* Cards that respond to the pointer in three dimensions.

   Framer motion values rather than a CSS transform, because these cards
   also run a shared-element layout animation when they open. Framer
   composes its own layout transform with these; a CSS `transform` on the
   same element would just be overwritten mid-flight.

   Two CSS variables ride along for the specular sheen, so the highlight
   tracks the pointer independently of the tilt. */
export default function useTilt({ max = 7, scale = 1.015 } = {}) {
  const ref = useRef(null);

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const lift = useMotionValue(0);

  const spring = { stiffness: 260, damping: 24, mass: 0.4 };
  const sx = useSpring(px, spring);
  const sy = useSpring(py, spring);
  const sl = useSpring(lift, spring);

  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const s = useTransform(sl, [0, 1], [1, scale]);

  const onPointerMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    px.set(nx);
    py.set(ny);
    el.style.setProperty('--mx', `${nx * 100}%`);
    el.style.setProperty('--my', `${ny * 100}%`);
  }, [px, py]);

  const onPointerEnter = useCallback(() => lift.set(1), [lift]);

  const onPointerLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
    lift.set(0);
  }, [px, py, lift]);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return reduced
    ? { ref, handlers: {}, style: {} }
    : {
        ref,
        handlers: { onPointerMove, onPointerEnter, onPointerLeave },
        style: { rotateX, rotateY, scale: s, transformPerspective: 900 },
      };
}
