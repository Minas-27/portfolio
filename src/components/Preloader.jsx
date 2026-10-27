import { useEffect, useRef, useState } from 'react';
import { gsap, reduced, fontsReady } from '../lib/motion';
import { personalInfo } from '../data/content';
import './Preloader.css';

/* Counts 000 → 100 while the fonts load, then lifts away and hands the
   stage to the hero. Once per session; skipped with reduced motion. */

export const INTRO_EVENT = 'intro:ready';

function announce() {
  window.__introDone = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export default function Preloader() {
  const [show] = useState(() => {
    try {
      return !reduced() && !sessionStorage.getItem('aa-intro');
    } catch {
      return !reduced();
    }
  });
  const root = useRef(null);
  const count = useRef(null);
  const bar = useRef(null);
  const [gone, setGone] = useState(!show);

  useEffect(() => {
    if (!show) {
      announce();
      return undefined;
    }
    try {
      sessionStorage.setItem('aa-intro', '1');
    } catch {
      /* private mode, fine */
    }
    document.documentElement.classList.add('is-loading');

    const state = { v: 0 };
    const render = () => {
      if (count.current) count.current.textContent = String(Math.round(state.v)).padStart(3, '0');
      if (bar.current) bar.current.style.transform = `scaleX(${state.v / 100})`;
    };

    const tl = gsap.timeline({ paused: true });
    tl.to(state, { v: 86, duration: 0.9, ease: 'power2.inOut', onUpdate: render });

    const finish = gsap.timeline({ paused: true });
    finish
      .to(state, { v: 100, duration: 0.3, ease: 'power1.out', onUpdate: render })
      .to('.pre__inner', { yPercent: -30, opacity: 0, duration: 0.5, ease: 'power3.in' }, '+=0.05')
      .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.8, ease: 'expo.inOut' }, '-=0.25')
      .add(() => {
        document.documentElement.classList.remove('is-loading');
        announce();
      }, '-=0.45')
      .add(() => setGone(true));

    tl.play();
    const fonts = fontsReady();
    const minTime = new Promise((r) => setTimeout(r, 950));
    let cancelled = false;
    Promise.all([fonts, minTime]).then(() => !cancelled && finish.play());

    return () => {
      cancelled = true;
      tl.kill();
      finish.kill();
      document.documentElement.classList.remove('is-loading');
    };
  }, [show]);

  if (gone) return null;

  return (
    <div className="pre" ref={root} aria-hidden="true">
      <div className="pre__inner">
        <div className="pre__top t-meta">
          <span>{personalInfo.location}</span>
        </div>
        <p className="pre__word">{personalInfo.name.split(' ')[0]}</p>
        <div className="pre__bottom">
          <p className="pre__name">{personalInfo.name}</p>
          <span className="pre__count tabular" ref={count}>000</span>
        </div>
        <div className="pre__track">
          <span ref={bar} />
        </div>
      </div>
    </div>
  );
}
