import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, reduced } from '../lib/motion';
import { INTRO_EVENT } from './Preloader';
import PhoneShowcase from './PhoneShowcase';
import profileCut from '../assets/profile-cut.webp';
import './HeroPortrait.css';

/* The hero's right side. It opens on the live phone; on scroll the phone
   lifts off into particles that rebuild as three layers, the full stack.

   LEAD decides what the hero opens on:
     'phone'  the live phone (current)
     'photo'  the portrait, gathered from particles then shown sharp.
              Switch to this once the studio photo is in
              (python3 scripts/cut-portrait.py path/to/photo.jpg). */
const LEAD = 'phone';

const LAYERS = [
  { name: 'Mobile', detail: 'Android · Flutter · Mini Apps' },
  { name: 'Web', detail: 'Vue.js · React' },
  { name: 'Backend', detail: 'Spring Boot · PostgreSQL' },
];

export default function HeroPortrait() {
  const root = useRef(null);
  const canvas = useRef(null);
  const lead = useRef(null);

  useEffect(() => {
    const host = root.current;
    let field = null;
    let dead = false;
    let ctx;
    const hand = { ready: LEAD === 'phone' ? 1 : 0, scroll: 1 };

    const start = async () => {
      if (!host.offsetParent) return; // hidden on small screens
      const { createField } = await import('../lib/particleField');
      const phoneBox = () => {
        const el = lead.current.querySelector('.phone__frame') || lead.current;
        return { w: el.offsetWidth, h: el.offsetHeight };
      };
      field = await createField(host, canvas.current, LEAD === 'photo' ? profileCut : null, LEAD === 'phone' ? phoneBox : null).catch(() => null);
      if (dead) { field?.destroy(); return; }
      if (!field) { host.classList.add('is-plain'); return; }
      host.classList.add('is-live');
      const f = field;
      const first = LEAD === 'photo' ? 'portrait' : 'phone';
      const labels = [...host.querySelectorAll('[data-layer]')];
      const paint = () => {
        const o = hand.ready * hand.scroll;
        lead.current.style.opacity = o;
        lead.current.style.pointerEvents = o > 0.5 ? '' : 'none';
        f.fade(1 - o);
      };
      f.onLayout(() => {
        if (LEAD === 'photo') {
          const c = canvas.current;
          lead.current.style.height = `${f.portraitHeight() * c.clientHeight}px`;
          lead.current.style.left = `${c.offsetLeft + c.clientWidth / 2}px`;
          lead.current.style.top = `${c.offsetTop + c.clientHeight / 2}px`;
        }
        labels.forEach((l, i) => {
          if (!f.anchors.layers[i]) return;
          const p = f.toLocal(f.anchors.layers[i]);
          l.style.left = `${p.left}px`;
          l.style.top = `${p.top}px`;
        });
      });
      f.setReveal(2);
      f.setMorph(first, 'stack', 0);
      paint();
      if (reduced()) return;

      ctx = gsap.context(() => {
        if (LEAD === 'photo') {
          const s = { m: 0, r: 0 };
          hand.ready = 0; paint();
          f.setMorph('dust', 'portrait', 0);
          gsap.to(s, { r: 2, duration: 1.6, ease: 'none', onUpdate: () => f.setReveal(s.r) });
          gsap.to(s, {
            m: 1, duration: 3, ease: 'power2.inOut', delay: 0.1,
            onUpdate: () => { if (hand.scroll > 0.99) f.setMorph('dust', 'portrait', s.m); },
            onComplete: () => gsap.to(hand, { ready: 1, duration: 1, ease: 'power2.inOut', onUpdate: paint }),
          });
        }

        // Scroll: the lead → the stack, while the hero holds still
        // (see .hero--hold in Hero.css).
        const hero = host.closest('.hero');
        let active = -1;
        ScrollTrigger.create({
          trigger: hero, start: 'top top', end: 'bottom bottom', scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            hand.scroll = 1 - Math.min(1, p / 0.07);
            paint();
            const m = Math.min(1, Math.max(0, (p - 0.05) / 0.5));
            if (p > 0.001) f.setMorph(first, 'stack', m);
            host.classList.toggle('is-stack', m > 0.8);
            const i = m < 0.95 ? -1 : Math.min(LAYERS.length - 1, Math.floor(((p - 0.55) / 0.45) * LAYERS.length));
            if (i !== active) {
              active = i;
              f.highlight(i);
              labels.forEach((l, k) => l.classList.toggle('is-on', k === i));
            }
          },
        });
      }, host);
    };

    const go = () => start();
    if (window.__introDone) go();
    else window.addEventListener(INTRO_EVENT, go, { once: true });
    return () => {
      dead = true;
      window.removeEventListener(INTRO_EVENT, go);
      ctx?.revert();
      field?.destroy();
    };
  }, []);

  return (
    <div className={`hp hp--${LEAD}`} ref={root}>
      <canvas className="hp__canvas" ref={canvas} aria-hidden="true" />
      {LEAD === 'photo'
        ? <img className="hp__photo" ref={lead} src={profileCut} alt="Abraham Addisu" />
        : <div className="hp__phone" ref={lead}><PhoneShowcase /></div>}
      <ul className="hp__layers" aria-label="Works across the full stack">
        {LAYERS.map((l, i) => (
          <li key={l.name} data-layer={i}>
            <span className="hp__no t-meta">0{i + 1}</span>
            <strong>{l.name}</strong>
            <span className="t-meta">{l.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
