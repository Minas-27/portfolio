import { useEffect } from 'react';

/* Freezes the page behind a modal without the layout jumping.

   Setting `overflow: hidden` on <body> removes the scrollbar, and the
   content immediately reflows ~15px wider, which reads as the whole
   screen twitching sideways as the modal opens, then twitching back on
   close. Reserving that width as padding keeps everything still.

   Also wires Escape to close, so every modal behaves the same way. */
export default function useBodyLock(active, onEscape) {
  useEffect(() => {
    if (!active) return;

    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';
    if (gap > 0) body.style.paddingRight = `${gap}px`;

    const onKey = (e) => {
      if (e.key === 'Escape') onEscape?.();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
      window.removeEventListener('keydown', onKey);
    };
  }, [active, onEscape]);
}
