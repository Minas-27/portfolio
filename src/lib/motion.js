import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };

export const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const EASE = 'expo.out';

/* Fonts, but never waiting on a slow font server for more than 2.5s.
   If they arrive later, App refreshes every trigger. */
export const fontsReady = () =>
  Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]);

/* ── Smooth scroll ─────────────────────────────────────────────── */
let lenis = null;

export function startSmooth() {
  if (reduced() || lenis) return lenis;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis?.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  return lenis;
}

export function stopSmooth() {
  lenis?.destroy();
  lenis = null;
}

export function pauseScroll(paused) {
  if (!lenis) return;
  if (paused) lenis.stop();
  else lenis.start();
}

/* Scroll to a section by id. `hero` means the very top. */
export function scrollToId(id, { immediate = false } = {}) {
  const target = id === 'hero' ? 0 : document.getElementById(id);
  if (target === null) return;
  if (lenis && !immediate) {
    // Pinned sections change the page height after load; measure fresh,
    // and if anything shifted on the way, settle exactly on the target.
    lenis.resize();
    lenis.scrollTo(target, {
      offset: 0,
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      onComplete: () => {
        if (target !== 0 && Math.abs(target.getBoundingClientRect().top) > 2) {
          lenis?.scrollTo(target, { immediate: true, force: true });
        }
      },
    });
  } else {
    const top = target === 0 ? 0 : target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: reduced() || immediate ? 'auto' : 'smooth' });
  }
  // Move focus for keyboard and screen-reader users, without a jump.
  const el = id === 'hero' ? document.getElementById('hero') : target;
  if (el && el.focus) {
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  }
}

/* ── Scroll reveals ────────────────────────────────────────────────
   Markup opts in with classes; nothing is hidden by CSS, so if this
   never runs (reduced motion, a crawler, an error) the page is simply
   there.

   .js-chars   display words, characters rise out of a mask
   .js-lines   paragraphs, lines rise out of a mask
   .js-clip    blocks, unclipped bottom to top
   .js-stagger children of this element clip in one after another
   .js-rule    rules draw from the left
   .js-track   big type tightens its tracking as it scrolls in       */

function setupReveals(root) {
  root.querySelectorAll('.js-chars').forEach((el) => {
    SplitText.create(el, {
      type: 'words,chars',
      mask: 'chars',
      onSplit: (self) =>
        gsap.from(self.chars, {
          yPercent: 115,
          duration: 1.25,
          ease: EASE,
          stagger: 0.035,
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }),
    });
  });

  root.querySelectorAll('.js-lines').forEach((el) => {
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 105,
          duration: 1.1,
          ease: EASE,
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        }),
    });
  });

  root.querySelectorAll('.js-clip').forEach((el) => {
    gsap.from(el, {
      clipPath: 'inset(0% 0% 100% 0%)',
      y: 32,
      duration: 1.2,
      ease: EASE,
      clearProps: 'clipPath,transform',
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
    });
  });

  root.querySelectorAll('.js-stagger').forEach((el) => {
    gsap.from(el.children, {
      clipPath: 'inset(0% 0% 100% 0%)',
      y: 24,
      duration: 1,
      ease: EASE,
      stagger: 0.06,
      clearProps: 'clipPath,transform',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  root.querySelectorAll('.js-rule').forEach((el) => {
    gsap.from(el, {
      scaleX: 0,
      transformOrigin: '0% 50%',
      duration: 1.4,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: el, start: 'top 95%', once: true },
    });
  });

  root.querySelectorAll('.js-track').forEach((el) => {
    gsap.fromTo(
      el,
      { letterSpacing: '0.05em' },
      {
        letterSpacing: getComputedStyle(el).letterSpacing,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'top 45%', scrub: true },
      },
    );
  });
}

/* Runs the reveals inside `ref`, after the fonts have loaded so text
   is measured in its real face. `extra(root)` adds section-specific
   timelines to the same context, so everything reverts together. */
export function useReveal(ref, extra) {
  useEffect(() => {
    if (reduced() || !ref.current) return undefined;
    let ctx;
    let dead = false;
    fontsReady().then(() => {
      if (dead || !ref.current) return;
      ctx = gsap.context(() => {
        setupReveals(ref.current);
        extra?.(ref.current);
      }, ref);
    });
    return () => {
      dead = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
