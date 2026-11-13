import { useEffect, useRef, useState } from 'react';
import { services } from '../data/content';
import { reduced, pauseScroll } from '../lib/motion';
import './ServiceScene.css';

/* What I Can Deliver, one service at a time. The section holds still while
   you scroll; each step swaps the words on the left and the particles on
   the right rebuild into a figure for that service:

     stack · phone · shield · map pin · card · app grid · globe

   Plain 2D canvas with a little 3D turn. Wide screens only; phones keep
   the accordion list. */

const N = 10000;
const TAU = Math.PI * 2;
const pad = (n) => String(n).padStart(2, '0');
const R = Math.random;
const lerp = (a, b, t) => a + (b - a) * t;

// Each maker returns [x, y, z, accent] in a -1..1 box.
const rrect = (w, h, r) => {
  // a point on a rounded rectangle outline
  const t = R() * 4, s = Math.floor(t), u = (t - s) * 2 - 1;
  if (R() < 0.22) { const a = R() * TAU; return [Math.sign(Math.cos(a)) * (w - r) + Math.cos(a) * r, Math.sign(Math.sin(a)) * (h - r) + Math.sin(a) * r]; }
  return s % 2 ? [(s === 1 ? 1 : -1) * w, u * (h - r)] : [u * (w - r), (s === 0 ? 1 : -1) * h];
};
const SHAPES = [
  // 1 · full stack: three tilted layers
  () => {
    const l = Math.floor(R() * 3), edge = R() < 0.4;
    let u = R() * 2 - 1, v = R() * 2 - 1;
    if (edge) { if (R() < 0.5) u = Math.sign(u); else v = Math.sign(v); }
    else { u = Math.round(u * 5) / 5; v = Math.round(v * 5) / 5; }
    return [(u - v) * 0.55, (1 - l) * 0.55 + (u + v) * 0.2, (u + v) * 0.3, l === 0];
  },
  // 2 · android & flutter: a phone
  () => {
    if (R() < 0.5) { const [x, y] = rrect(0.5, 0.95, 0.14); return [x, y, 0, false]; }
    if (R() < 0.12) return [lerp(-0.14, 0.14, R()), 0.82, 0, true];
    const c = Math.floor(R() * 3), r = Math.floor(R() * 4);
    return [(c - 1) * 0.28 + (R() - 0.5) * 0.16, 0.5 - r * 0.33 + (R() - 0.5) * 0.16, 0, r === 0 && c === 0];
  },
  // 3 · healthcare & insurance: a shield with a cross
  () => {
    if (R() < 0.55) {
      const t = R();
      const x = t < 0.5 ? lerp(-0.75, 0.75, t * 2) : 0.75 * Math.cos((t - 0.5) * Math.PI);
      const y = t < 0.5 ? 0.85 : 0.85 - 1.8 * Math.pow(Math.sin((t - 0.5) * Math.PI), 1.6);
      const side = R() < 0.5 ? 1 : -1;
      return t < 0.5 ? [x, y, 0, false] : [side * x, y, 0, false];
    }
    const v = R() < 0.5;
    return [v ? (R() - 0.5) * 0.2 : (R() - 0.5) * 0.7, (v ? (R() - 0.5) * 0.7 : (R() - 0.5) * 0.2) + 0.12, 0.08, true];
  },
  // 4 · real-time & location: a map pin over signal rings
  () => {
    const k = R();
    if (k < 0.4) {
      const a = lerp(-0.25, 1.25, R()) * Math.PI;
      return [Math.cos(a) * 0.5, 0.4 + Math.sin(a) * 0.5, 0, false];
    }
    if (k < 0.58) { const t = R(), s = R() < 0.5 ? 1 : -1; return [s * lerp(0.36, 0, t), lerp(0.05, -0.62, t), 0, false]; }
    if (k < 0.7) { const a = R() * TAU; return [Math.cos(a) * 0.17, 0.4 + Math.sin(a) * 0.17, 0.05, true]; }
    const ring = 1 + Math.floor(R() * 3), a = R() * TAU;
    return [Math.cos(a) * ring * 0.3, -0.72 + Math.sin(a) * ring * 0.07, Math.sin(a) * ring * 0.3, ring === 1];
  },
  // 5 · payments & messaging: a card and a message bubble
  () => {
    const k = R();
    if (k < 0.38) { const [x, y] = rrect(0.8, 0.5, 0.1); return [x - 0.1, y - 0.25, 0, false]; }
    if (k < 0.55) return [lerp(-0.9, 0.7, R()), -0.02 + (R() - 0.5) * 0.14, 0, true];
    if (k < 0.65) return [lerp(-0.7, -0.2, R()), -0.5 + Math.round(R()) * 0.12, 0, false];
    if (k < 0.92) { const [x, y] = rrect(0.42, 0.26, 0.12); return [x + 0.5, y + 0.62, 0.2, false]; }
    return [0.5 + (Math.floor(R() * 3) - 1) * 0.2 + (R() - 0.5) * 0.05, 0.62 + (R() - 0.5) * 0.05, 0.2, true];
  },
  // 6 · super app mini apps: apps inside an app
  () => {
    if (R() < 0.3) { const [x, y] = rrect(0.92, 0.92, 0.2); return [x, y, 0, false]; }
    const c = Math.floor(R() * 3), r = Math.floor(R() * 3);
    const mine = c === 1 && r === 1;
    if (R() < 0.5) { const [x, y] = rrect(0.2, 0.2, 0.06); return [(c - 1) * 0.56 + x, (1 - r) * 0.56 + y, mine ? 0.25 : 0.05, mine]; }
    return [(c - 1) * 0.56 + (R() - 0.5) * 0.36, (1 - r) * 0.56 + (R() - 0.5) * 0.36, mine ? 0.25 : 0.05, mine];
  },
  // 7 · offline-first & localisation: a globe
  () => {
    const lat = R() < 0.5;
    let th, ph;
    if (lat) { th = (Math.round(R() * 6) / 6) * Math.PI; ph = R() * TAU; }
    else { th = R() * Math.PI; ph = (Math.round(R() * 10) / 10) * TAU; }
    const r = 0.9;
    return [r * Math.sin(th) * Math.cos(ph), r * Math.cos(th), r * Math.sin(th) * Math.sin(ph), lat && Math.abs(th - Math.PI / 2) < 0.01];
  },
];

export default function ServiceScene() {
  const root = useRef(null);
  const canvas = useRef(null);
  const [step, setStep] = useState(0);
  const stepRef = useRef(0);

  useEffect(() => {
    const el = root.current;
    const cv = canvas.current;
    const ctx = cv.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const still = reduced();
    const targets = SHAPES.map((make) => {
      const a = new Float32Array(N * 4);
      for (let i = 0; i < N; i++) { const p = make(); a[i * 4] = p[0]; a[i * 4 + 1] = p[1]; a[i * 4 + 2] = p[2]; a[i * 4 + 3] = p[3] ? 1 : 0; }
      return a;
    });
    const pos = new Float32Array(N * 3), vel = new Float32Array(N * 3), delay = new Float32Array(N);
    for (let i = 0; i < N; i++) { pos[i * 3] = (R() - 0.5) * 3; pos[i * 3 + 1] = (R() - 0.5) * 3; pos[i * 3 + 2] = (R() - 0.5) * 3; delay[i] = R(); }

    let w = 0, h = 0, raf = 0, visible = false, shown = 0, since = 0;
    const mouse = { x: 0, y: 0 };
    const size = () => { w = cv.clientWidth; h = cv.clientHeight; cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
    const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
    let fg = css('--fg'), accent = css('--accent');

    const tick = () => {
      raf = 0;
      if (!visible) return;
      if (shown !== stepRef.current) { shown = stepRef.current; since = performance.now(); }
      const T = targets[shown];
      const age = (performance.now() - since) / 1000;
      const t = performance.now() / 1000;
      const ry = still ? 0.35 : Math.sin(t * 0.3) * 0.38 + mouse.x * 0.4, rx = still ? -0.1 : -0.12 + mouse.y * 0.22;
      const cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
      const scale = Math.min(w, h) * 0.4;
      ctx.clearRect(0, 0, w, h);
      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = pass ? accent : fg;
        ctx.globalAlpha = pass ? 1 : 0.78;
        for (let i = 0; i < N; i++) {
          if ((T[i * 4 + 3] > 0.5) !== !!pass) continue;
          if (pass === 0) { // integrate once per particle
            const go = age > delay[i] * 0.35;
            for (let k = 0; k < 3; k++) {
              const j = i * 3 + k;
              if (go) vel[j] = (vel[j] + (T[i * 4 + k] - pos[j]) * 0.07) * 0.8;
              pos[j] += vel[j];
            }
          }
          const x = pos[i * 3], y = pos[i * 3 + 1], z = pos[i * 3 + 2];
          const x1 = x * cy + z * sy, z1 = -x * sy + z * cy;
          const y1 = y * cx - z1 * sx, z2 = y * sx + z1 * cx;
          const pz = 3 / (3 - z2);
          const px = Math.round((w / 2 + x1 * scale * pz) * dpr) / dpr;
          const py = Math.round((h / 2 - y1 * scale * pz) * dpr) / dpr;
          const s = Math.round((pass ? 1.9 : 1.5) * pz * dpr) / dpr || 1 / dpr;
          ctx.fillRect(px, py, s, s);
        }
      }
      // accent particles also need integrating
      for (let i = 0; i < N; i++) {
        if (T[i * 4 + 3] <= 0.5) continue;
        const go = age > delay[i] * 0.35;
        for (let k = 0; k < 3; k++) { const j = i * 3 + k; if (go) vel[j] = (vel[j] + (T[i * 4 + k] - pos[j]) * 0.07) * 0.8; pos[j] += vel[j]; }
      }
      raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf && visible) raf = requestAnimationFrame(tick); };

    const ro = new ResizeObserver(size); ro.observe(cv); size();
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; kick(); }); io.observe(el);
    const mo = new MutationObserver(() => { fg = css('--fg'); accent = css('--accent'); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    const onMove = (e) => { mouse.x = e.clientX / window.innerWidth - 0.5; mouse.y = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener('pointermove', onMove, { passive: true });

    // Progress comes from where the scene actually is, not from a cached
    // measurement, so pinned sections above it can't throw it off.
    const update = () => {
      const r = el.getBoundingClientRect();
      const span = Math.max(1, el.offsetHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / span));
      const i = Math.min(services.length - 1, Math.floor(p * services.length));
      if (i !== stepRef.current) { stepRef.current = i; setStep(i); }
      el.style.setProperty('--p', p.toFixed(4));
    };
    let queued = 0;
    const onScroll = () => { if (!queued) queued = requestAnimationFrame(() => { queued = 0; update(); }); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); cancelAnimationFrame(queued); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); window.removeEventListener('pointermove', onMove); };
  }, []);

  const jump = (i) => {
    const el = root.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const y = top + ((el.offsetHeight - window.innerHeight) * (i + 0.5)) / services.length;
    pauseScroll(false);
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div className="scene" ref={root} style={{ '--steps': services.length }}>
      <div className="scene__pin">
        <div className="scene__text">
          {services.map((s, i) => (
            <article key={s.title} className={`scene__card${i === step ? ' is-on' : ''}${i < step ? ' is-past' : ''}`} aria-hidden={i !== step}>
              <p className="t-meta tabular scene__count"><b>{pad(i + 1)}</b> / {pad(services.length)}</p>
              <h3 className="scene__title">{s.title}</h3>
              <p className="scene__sum">{s.summary}</p>
              <p className="scene__desc t-body">{s.description}</p>
            </article>
          ))}
        </div>
        <canvas className="scene__canvas" ref={canvas} aria-hidden="true" />
        <ol className="scene__rail">
          {services.map((s, i) => (
            <li key={s.short} className={i === step ? 'is-on' : i < step ? 'is-past' : ''}>
              <button type="button" onClick={() => jump(i)} className="t-meta" data-magnetic="0.2">
                <span className="tabular">{pad(i + 1)}</span>{s.short}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
