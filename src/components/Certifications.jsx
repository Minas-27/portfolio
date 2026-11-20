import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Shuffle, X } from 'lucide-react';
import { certifications, issuerLogos, sectionCopy } from '../data/content';
import { gsap, reduced, useReveal } from '../lib/motion';
import useBodyLock, { usePresence } from '../lib/useBodyLock';
import SectionHead from './SectionHead';
import './Certifications.css';

const copy = sectionCopy.certifications;
const pad = (n) => String(n).padStart(2, '0');

/* The receipts are prints dropped on a desk: drag them around,
   click one to open it. Where each print lands, as a share of the
   desk (left, top), its tilt in degrees, and its width. Same order
   as `certifications`; extra entries fall back to a loose grid. */
const LAYOUT = [
  { x: 33, y: 5, r: -4, w: 24 },   // Hult national finalist
  { x: 4, y: 9, r: -9, w: 24 },    // Hult on-campus winner
  { x: 58, y: 10, r: 6, w: 24 },    // CoBuild 2nd place
  { x: 79, y: 44, r: 8, w: 17 },   // One Young World
  { x: 5, y: 56, r: 6, w: 17 },    // Anthropic
  { x: 25, y: 50, r: -3, w: 21 },  // Wellness
  { x: 48, y: 42, r: -8, w: 14 },  // DevQuest (portrait)
  { x: 59, y: 57, r: 3, w: 19 },   // i-Teams
];
const spot = (i) =>
  LAYOUT[i] || { x: 6 + (i % 4) * 22, y: 10 + Math.floor(i / 4) * 40, r: i % 2 ? 5 : -5, w: 18 };

const prints = certifications.map((c, i) => ({
  ...c,
  n: i + 1,
  logo: c.image ? null : issuerLogos[c.issuer] || null,
  ...spot(i),
}));

const tally = (k) => pad(certifications.filter((c) => c.kind === k).length);

function Viewer({ cert, state, onClose }) {
  const box = useRef(null);
  useBodyLock(state === 'open', onClose, box);

  return (
    <div
      className="certview"
      data-state={state}
      data-modal
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
      data-lenis-prevent
      ref={box}
      onClick={onClose}
    >
      <div className="certview__bar wrap" onClick={(e) => e.stopPropagation()}>
        <p className="t-label certview__caption">
          {cert.title}
          <span> / {cert.issuer}</span>
        </p>
        <button className="certview__close t-label" onClick={onClose}>
          Close <X size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <figure className="certview__stage">
        <img
          src={cert.image}
          alt={`Certificate: ${cert.title}, ${cert.issuer}`}
          onClick={(e) => e.stopPropagation()}
        />
      </figure>
    </div>
  );
}

/* One print. The paper is the same for every entry: a photo of the
   certificate, or, for credentials that only live online, a printed
   card with the issuer's mark. */
function Print({ cert, onOpen }) {
  const label = `${cert.title}, ${cert.issuer}, ${cert.date}`;
  const paper = (
    <>
      <span className={`print__photo${cert.image ? '' : ' print__photo--card'}`}>
        {cert.image ? (
          <img src={cert.image} alt="" draggable={false} loading="lazy" />
        ) : (
          <>
            {cert.logo && <img src={cert.logo} alt="" draggable={false} loading="lazy" />}
            <span className="print__verified">
              Verified online <ArrowUpRight size={11} strokeWidth={1.5} aria-hidden="true" />
            </span>
            {cert.credentialId && <span className="print__id">ID {cert.credentialId.slice(0, 13)}…</span>}
          </>
        )}
        {cert.stamp && (
          <span className="print__stamp" aria-hidden="true">
            <b>{cert.stamp}</b>
          </span>
        )}
      </span>
      <span className="print__cap">
        <span className="print__title">{cert.title}</span>
        <span className="print__meta">
          <span className="tabular">{pad(cert.n)}</span>
          <span>{cert.issuer}</span>
          <span className="tabular">{cert.date}</span>
        </span>
      </span>
    </>
  );

  return cert.link ? (
    <a
      className="print"
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      data-cursor="Drag"
      aria-label={`${label}. Verify credential (opens in a new tab)`}
    >
      {paper}
    </a>
  ) : (
    <button
      type="button"
      className="print"
      onClick={() => onOpen(cert)}
      data-cursor="Drag"
      aria-label={`${label}. View certificate`}
    >
      {paper}
    </button>
  );
}

/* Drag, lift to the top, tilt with the throw, settle on release.
   A press that barely moves is still a click. Fine pointers only:
   on touch the desk is a loose pile you scroll past, not a toy that
   eats the scroll. */
function useDesk(deskRef) {
  const shuffleRef = useRef(() => {});

  useEffect(() => {
    const desk = deskRef.current;
    if (!desk) return undefined;
    const canDrag = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 761px)');
    const still = reduced();
    const items = [...desk.querySelectorAll('.desk__item')];
    let top = items.length + 1;
    const off = [];

    items.forEach((el) => {
      let sx = 0, sy = 0, ox = 0, oy = 0, lastX = 0, moved = false, bounds = null, id = null;
      el.dataset.r0 = el.dataset.r;
      gsap.set(el, { rotation: Number(el.dataset.r) });

      const down = (e) => {
        if (!canDrag.matches || e.button !== 0) return;
        id = e.pointerId;
        moved = false;
        sx = lastX = e.clientX;
        sy = e.clientY;
        ox = gsap.getProperty(el, 'x');
        oy = gsap.getProperty(el, 'y');
        const d = desk.getBoundingClientRect();
        const r = el.getBoundingClientRect();
        // keep at least 40% of the print on the desk
        bounds = {
          minX: ox + (d.left - r.left) - r.width * 0.6,
          maxX: ox + (d.right - r.right) + r.width * 0.6,
          minY: oy + (d.top - r.top) - r.height * 0.4,
          maxY: oy + (d.bottom - r.bottom) + r.height * 0.6,
        };
        gsap.killTweensOf(el);
        el.style.zIndex = ++top;
      };

      const move = (e) => {
        if (e.pointerId !== id) return;
        const dx = e.clientX - sx;
        const dy = e.clientY - sy;
        if (!moved && Math.hypot(dx, dy) < 5) return;
        if (!moved) {
          moved = true;
          el.setPointerCapture(id);
          el.classList.add('is-lifted');
        }
        const tilt = still ? 0 : gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.8);
        lastX = e.clientX;
        gsap.set(el, {
          x: gsap.utils.clamp(bounds.minX, bounds.maxX, ox + dx),
          y: gsap.utils.clamp(bounds.minY, bounds.maxY, oy + dy),
        });
        gsap.to(el, { rotation: Number(el.dataset.r) + tilt, duration: 0.4, ease: 'power3', overwrite: 'auto' });
      };

      const up = (e) => {
        if (e.pointerId !== id) return;
        id = null;
        el.classList.remove('is-lifted');
        if (moved) {
          gsap.to(el, { rotation: Number(el.dataset.r), duration: still ? 0 : 0.9, ease: 'elastic.out(1, 0.5)' });
        }
      };

      // a drag must not also open the certificate
      const click = (e) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      };
      const focus = () => { el.style.zIndex = ++top; };

      el.addEventListener('pointerdown', down);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      el.addEventListener('click', click, true);
      el.addEventListener('focusin', focus);
      off.push(() => {
        el.removeEventListener('pointerdown', down);
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
        el.removeEventListener('click', click, true);
        el.removeEventListener('focusin', focus);
      });
    });

    shuffleRef.current = () => {
      items.forEach((el, i) => {
        const r = Number(el.dataset.r0) + gsap.utils.random(-6, 6);
        el.dataset.r = r;
        el.style.zIndex = i + 1;
        gsap.to(el, {
          x: gsap.utils.random(-24, 24),
          y: gsap.utils.random(-18, 18),
          rotation: r,
          duration: still ? 0 : 1.1,
          delay: still ? 0 : i * 0.04,
          ease: 'expo.out',
        });
      });
      top = items.length + 1;
    };

    return () => off.forEach((f) => f());
  }, [deskRef]);

  return () => shuffleRef.current();
}

export default function Certifications() {
  const root = useRef(null);
  const desk = useRef(null);
  const [selected, setSelected] = useState(null);
  const [shown, setShown] = useState(null);
  const [mounted, state] = usePresence(!!selected, 500);
  const shuffle = useDesk(desk);

  // The prints fall onto the desk, then the stamps land on the winners.
  useReveal(root, (el) => {
    const items = el.querySelectorAll('.desk__item');
    const stamps = el.querySelectorAll('.print__stamp');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el.querySelector('.desk'), start: 'top 75%', once: true } });
    tl.from(items, {
      y: () => gsap.utils.random(-260, -160),
      x: () => gsap.utils.random(-60, 60),
      rotation: () => gsap.utils.random(-30, 30),
      scale: 1.18,
      autoAlpha: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: { each: 0.08, from: 'random' },
    }).from(
      stamps,
      { scale: 2.4, autoAlpha: 0, duration: 0.45, ease: 'back.out(2.2)', stagger: 0.14 },
      '-=0.35',
    );
  });

  const open = (cert) => {
    setShown(cert);
    setSelected(cert);
  };

  return (
    <section className="certs section" id="certifications" ref={root} aria-labelledby="certs-title">
      <div className="wrap">
        <SectionHead id="certifications" copy={copy} titleId="certs-title" />

        <div className="desk" ref={desk}>
          <p className="desk__corner desk__corner--tl t-meta">
            <span className="tabular">{pad(certifications.length)}</span> receipts on the desk
          </p>
          <div className="desk__corner desk__corner--tr t-meta">
            <span className="desk__hint">Drag them around · click to open</span>
            <span className="desk__hint--touch">Tap a print to open it</span>
            <button type="button" className="desk__shuffle t-meta" onClick={shuffle}>
              <Shuffle size={13} strokeWidth={1.5} aria-hidden="true" /> Shuffle
            </button>
          </div>

          <ul className="desk__pile">
            {prints.map((cert, i) => (
              <li
                key={cert.title}
                className="desk__item"
                data-r={cert.r}
                style={{
                  '--x': `${cert.x}%`,
                  '--y': `${cert.y}%`,
                  '--w': `${cert.w}%`,
                  '--r': `${cert.r}deg`,
                  zIndex: i + 1,
                }}
              >
                <Print cert={cert} onOpen={open} />
              </li>
            ))}
          </ul>

          <p className="desk__corner desk__corner--bl t-meta">
            <span>Won <b className="tabular">{tally('won')}</b></span>
            <span>Verified <b className="tabular">{tally('verified')}</b></span>
            <span>Took part <b className="tabular">{tally('joined')}</b></span>
          </p>
        </div>
      </div>

      {mounted && shown && <Viewer cert={shown} state={state} onClose={() => setSelected(null)} />}
    </section>
  );
}
