import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { personalInfo, projects } from '../data/content';
import { gsap, reduced, scrollToId } from '../lib/motion';
import { INTRO_EVENT } from './Preloader';
import PhoneShowcase from './PhoneShowcase';
import './Hero.css';

const liveCount = projects.filter((p) => p.status === 'Live').length;

const FACTS = [
  { value: liveCount, label: 'Projects shipped' },
  { value: 7, label: 'Packages on pub.dev' },
  { value: 2, suffix: '+', label: 'Years shipping apps' },
];

const HEAVY = 800;
const LIGHT = 180;

const Chars = ({ text, className }) => (
  <span className={className} aria-hidden="true">
    {[...text].map((c, i) => (
      <span key={i} className={`hero__char${c === ' ' ? ' is-gap' : ''}`}>{c === ' ' ? '' : c}</span>
    ))}
  </span>
);

/* The name thins out around the pointer, one letter at a time, using
   the font's weight axis. Pointer devices only. */
function useWeightLens(root) {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const el = root.current;
    if (!fine || reduced() || !el) return undefined;
    const chars = [...el.querySelectorAll('.hero__char')];
    let pointer = null;
    let frame = 0;

    const render = () => {
      frame = 0;
      const size = parseFloat(getComputedStyle(chars[0]).fontSize);
      const radius = size * 0.9;
      chars.forEach((c) => {
        let w = HEAVY;
        if (pointer) {
          const r = c.getBoundingClientRect();
          const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
          const t = Math.max(0, 1 - d / radius);
          w = HEAVY - (HEAVY - LIGHT) * t * t * (3 - 2 * t);
        }
        c.style.fontWeight = Math.round(w);
      });
    };
    const onMove = (e) => {
      pointer = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onLeave = () => {
      pointer = null;
      if (!frame) frame = requestAnimationFrame(render);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, [root]);
}

export default function Hero() {
  const root = useRef(null);
  const name = useRef(null);
  const [first, last] = personalInfo.name.toUpperCase().split(' ');
  useWeightLens(name);

  useEffect(() => {
    if (reduced()) return undefined;
    const el = root.current;
    let ctx;

    /* Everything waits under the preloader, then plays in one breath. */
    const setup = () => {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
        tl.from('.hero__line .hero__char', { yPercent: 110, duration: 1.25, stagger: 0.028 })
          .from('.hero__top > *', { y: -12, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.4)
          .from('.hero__rule', { scaleX: 0, duration: 1.4, ease: 'expo.inOut' }, 0.55)
          .from('.hero__tagline, .hero__roles, .hero__ctas, .hero__facts', {
            y: 24,
            opacity: 0,
            duration: 1,
            stagger: 0.08,
          }, 0.7)
          .from('.hero__stage', { y: 40, opacity: 0, duration: 1.2 }, 0.45);

        el.querySelectorAll('[data-count]').forEach((n) => {
          const o = { v: 0 };
          tl.to(o, {
            v: Number(n.dataset.count),
            duration: 1.2,
            ease: 'power3.out',
            onUpdate: () => (n.textContent = Math.round(o.v)),
          }, 1);
        });

        // Leaving: the name drifts up a little slower than the page.
        gsap.to('.hero__name', {
          yPercent: 22,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top top', end: 'bottom top', scrub: true },
        });
      }, root);
    };

    if (window.__introDone) setup();
    else window.addEventListener(INTRO_EVENT, setup, { once: true });

    return () => {
      window.removeEventListener(INTRO_EVENT, setup);
      ctx?.revert();
    };
  }, []);

  const toId = (id) => (e) => {
    e.preventDefault();
    scrollToId(id);
  };

  return (
    <section className="hero" id="hero" ref={root} aria-label="Introduction">
      <div className="hero__inner wrap">
        <div className="hero__top">
          <span className="status">
            <span className="status__dot" aria-hidden="true" />
            Open to freelance projects
          </span>
          <p className="t-meta hero__where">{personalInfo.location}</p>
        </div>

        <div className="hero__main">
          <div className="hero__copy">
            <h1 className="hero__name" ref={name} aria-label={personalInfo.name}>
              <Chars text={first} className="hero__line" />
              <span className="hero__char is-gap" aria-hidden="true" />
              <Chars text={last} className="hero__line hero__line--last" />
            </h1>

            <span className="hero__rule" aria-hidden="true" />

            <p className="hero__tagline">{personalInfo.valueProp}</p>

            <ul className="hero__roles t-label" aria-label="Roles">
              {personalInfo.roles.map((r) => <li key={r}>{r}</li>)}
            </ul>

            <div className="hero__ctas">
              <a href="#projects" className="btn btn--solid" onClick={toId('projects')} data-magnetic="0.15">
                See the work <ArrowDown size={15} strokeWidth={1.5} aria-hidden="true" />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="btn" data-magnetic="0.15">
                Email me <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
              </a>
            </div>

            <dl className="hero__facts">
              {FACTS.map((f) => (
                <div key={f.label} className="hero__fact">
                  <dd className="tabular">
                    <span data-count={f.value}>{f.value}</span>
                    {f.suffix}
                  </dd>
                  <dt className="t-meta">{f.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <div className="hero__stage">
            <PhoneShowcase />
          </div>
        </div>
      </div>
    </section>
  );
}
