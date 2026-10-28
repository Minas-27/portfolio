import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Moon, Sun } from 'lucide-react';
import { personalInfo } from '../data/content';
import { NAV } from '../lib/sections';
import { scrollToId, gsap, reduced } from '../lib/motion';
import { applyTheme, currentTheme } from '../lib/theme';
import useBodyLock from '../lib/useBodyLock';
import Clock from './Clock';
import './Navbar.css';

const typing = (el) =>
  el instanceof Element && !!el.closest('input, textarea, select, [contenteditable="true"]');

function go(e, id, after) {
  e?.preventDefault();
  after?.();
  // Let the menu finish closing before the page starts moving.
  setTimeout(() => scrollToId(id), after ? 280 : 0);
}

function ThemeToggle({ theme, onToggle, labeled = false }) {
  const light = theme === 'light';
  return (
    <button
      type="button"
      className={`nav__theme${labeled ? ' nav__theme--labeled' : ''}`}
      aria-pressed={light}
      aria-label={light ? 'Switch to dark theme' : 'Switch to light theme'}
      onClick={onToggle}
    >
      {light ? <Moon size={14} strokeWidth={1.5} aria-hidden="true" /> : <Sun size={14} strokeWidth={1.5} aria-hidden="true" />}
      {labeled && <span>{light ? 'Dark' : 'Light'}</span>}
    </button>
  );
}

export default function Navbar() {
  const [active, setActive] = useState(null);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(currentTheme);
  const toggleTheme = () => setTheme(applyTheme(theme === 'light' ? 'dark' : 'light'));
  const overlay = useRef(null);

  useBodyLock(open, () => setOpen(false), overlay);

  /* Background once off the top; hide on the way down, back on the way up. */
  useEffect(() => {
    let last = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > window.innerHeight * 0.8);
        last = y;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  /* Current section: whichever one crosses the middle of the screen. */
  useEffect(() => {
    const els = ['hero', ...NAV.map((n) => n.id)].map((id) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive(en.target.id)),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Shortcuts: H for the top, then the first letter of each section.
     Never while typing, never with a modifier, never over a dialog. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      if (typing(e.target) || document.querySelector('[data-modal]')) return;
      const k = e.key.toUpperCase();
      const id = k === 'H' ? 'hero' : NAV.find((n) => n.key === k)?.id;
      if (!id) return;
      e.preventDefault();
      scrollToId(id);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Menu: the rows rise one after another. */
  useEffect(() => {
    if (!open || reduced() || !overlay.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.from('.menu__item', { y: 8, opacity: 0, duration: 0.4, ease: 'power2.out', stagger: 0.03, delay: 0.08 });
      gsap.from('.menu__foot > *', { opacity: 0, y: 6, duration: 0.35, ease: 'power2.out', stagger: 0.04, delay: 0.16 });
    }, overlay);
    return () => ctx.revert();
  }, [open]);

  const cls = ['nav', scrolled && 'is-scrolled', hidden && !open && 'is-hidden', open && 'is-open']
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <header className={cls} onFocusCapture={() => setHidden(false)}>
        <div className="nav__inner">
          <a className="nav__word" href="#hero" onClick={(e) => go(e, 'hero')} aria-label={`${personalInfo.name}, back to top`}>
            Abraham <span>Addisu</span>
          </a>

          <Clock className="nav__clock" />

          <nav className="nav__links" aria-label="Main">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav__link${active === item.id ? ' is-active' : ''}`}
                aria-current={active === item.id ? 'true' : undefined}
                aria-keyshortcuts={item.key}
                title={`${item.label} (${item.key})`}
                onClick={(e) => go(e, item.id)}
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
            <a href={personalInfo.resumes.main} download="Abraham-Addisu-CV.pdf" className="nav__cv">
              Resume <ArrowDown size={13} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </nav>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          <button
            className="nav__burger t-label"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="menu"
          >
            <span className="nav__burger-text">{open ? 'Close' : 'Menu'}</span>
            <span className={`nav__burger-icon${open ? ' is-x' : ''}`} aria-hidden="true"><i /><i /></span>
          </button>
        </div>
      </header>

      <div
        id="menu"
        className={`menu${open ? ' is-open' : ''}`}
        ref={overlay}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        data-lenis-prevent
        aria-hidden={!open}
        inert={!open}
        onClick={() => setOpen(false)}
        {...(open ? { 'data-modal': '' } : {})}
      >
        <div className="menu__sheet" onClick={(e) => e.stopPropagation()}>
          <nav className="menu__list" aria-label="Main">
            {NAV.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`menu__row${active === item.id ? ' is-active' : ''}`}
                onClick={(e) => go(e, item.id, () => setOpen(false))}
              >
                <span className="menu__item">
                  <span className="menu__index t-meta tabular">{item.index}</span>
                  <span className="menu__label">{item.label}</span>
                </span>
              </a>
            ))}
          </nav>

          <div className="menu__foot">
            <div className="menu__links t-label">
              <a href={`mailto:${personalInfo.email}`}>Email <ArrowUpRight size={12} aria-hidden="true" /></a>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={12} aria-hidden="true" /></a>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={12} aria-hidden="true" /></a>
              <a href={personalInfo.telegram} target="_blank" rel="noopener noreferrer">Telegram <ArrowUpRight size={12} aria-hidden="true" /></a>
              <a href={personalInfo.resumes.main} download="Abraham-Addisu-CV.pdf">Resume <ArrowDown size={12} aria-hidden="true" /></a>
              <ThemeToggle theme={theme} onToggle={toggleTheme} labeled />
            </div>
            <Clock />
          </div>
        </div>
      </div>
    </>
  );
}
