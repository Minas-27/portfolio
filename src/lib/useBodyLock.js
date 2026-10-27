import { useEffect, useRef, useState } from 'react';
import { pauseScroll } from './motion';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* Freezes the page behind a modal without the layout jumping.

   Setting `overflow: hidden` on <body> removes the scrollbar, and the
   content immediately reflows ~15px wider, which reads as the whole
   screen twitching sideways as the modal opens, then twitching back on
   close. Reserving that width as padding keeps everything still.

   Also: Escape closes, Tab stays inside `trapRef`, and focus goes back
   to whatever opened the modal once it closes. */
export default function useBodyLock(active, onEscape, trapRef) {
  const onEscapeRef = useRef(onEscape);
  onEscapeRef.current = onEscape;

  useEffect(() => {
    if (!active) return undefined;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    const opener = document.activeElement;

    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    pauseScroll(true);

    const first = () => trapRef?.current?.querySelector(FOCUSABLE);
    const t = setTimeout(() => first()?.focus({ preventScroll: true }), 60);

    const onKey = (e) => {
      if (e.key === 'Escape') {
        onEscapeRef.current?.();
        return;
      }
      if (e.key !== 'Tab' || !trapRef?.current) return;
      const nodes = [...trapRef.current.querySelectorAll(FOCUSABLE)];
      if (!nodes.length) return;
      const a = nodes[0];
      const z = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      } else if (!trapRef.current.contains(document.activeElement)) {
        e.preventDefault();
        a.focus();
      }
    };
    window.addEventListener('keydown', onKey);

    return () => {
      clearTimeout(t);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      pauseScroll(false);
      window.removeEventListener('keydown', onKey);
      if (opener && opener.focus) opener.focus({ preventScroll: true });
    };
  }, [active, trapRef]);
}

/* Keeps a closing overlay mounted long enough to animate out.
   Returns [mounted, state] where state is 'open' or 'closing'. */
export function usePresence(open, exitMs = 600) {
  const [mounted, setMounted] = useState(open);
  const [state, setState] = useState(open ? 'open' : 'closed');

  useEffect(() => {
    if (open) {
      setMounted(true);
      setState('open');
      return undefined;
    }
    if (!mounted) return undefined;
    setState('closing');
    const ms = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : exitMs;
    const t = setTimeout(() => {
      setMounted(false);
      setState('closed');
    }, ms);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return [mounted, state];
}
