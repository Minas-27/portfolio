import { useEffect, useState } from 'react';
import { FiWifi, FiChevronRight } from 'react-icons/fi';
import { projects } from '../data/content';
import { formatEthiopian } from '../lib/ethiopian';
import './PhoneShowcase.css';

/* A working phone, not a mockup.

   The screen renders live from the same `projects` data as the rest of
   the site, the status bar shows the real time, and the date is the
   real Ethiopian date, computed on the fly, the same problem my
   ethio_calendar package exists to solve. If you build mobile apps,
   the portfolio should be one. */

const APPS = projects.slice(0, 6);

/* Tapping a row scrolls to the projects section and opens that project.
   A custom event keeps the two components decoupled: the phone announces
   what was tapped, Projects listens and handles it. */
function openProject(title) {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('open-project', { detail: title }));
  }, 520);
}

const initials = (title) =>
  title
    .replace(/[^A-Za-z0-9 _]/g, ' ')
    .split(/[\s_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

export default function PhoneShowcase() {
  const [now, setNow] = useState(new Date());
  const [active, setActive] = useState(0);

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(clock);
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cycle = setInterval(() => setActive((i) => (i + 1) % APPS.length), 2600);
    return () => clearInterval(cycle);
  }, []);

  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="phone" aria-label="A phone showing Abraham's shipped projects">
      <div className="phone__frame">
        <div className="phone__notch" aria-hidden="true" />

        <div className="phone__screen">
          <div className="phone__statusbar">
            <span className="phone__time">{time}</span>
            <span className="phone__glyphs" aria-hidden="true">
              <FiWifi size={11} />
              <i className="phone__battery" />
            </span>
          </div>

          <header className="phone__appbar">
            <div>
              <p className="phone__eyebrow">Shipped</p>
              <h3>Abroid</h3>
            </div>
            <span className="phone__date" title="Ethiopian calendar, computed live">
              {formatEthiopian(now)}
            </span>
          </header>

          <ul className="phone__list">
            {APPS.map((p, i) => (
              <li
                key={p.title}
                className={`phone__row${i === active ? ' is-active' : ''}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => openProject(p.title)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProject(p.title);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open ${p.title}`}
              >
                <span className="phone__icon" aria-hidden="true">{initials(p.title)}</span>
                <span className="phone__meta">
                  <strong>{p.title}</strong>
                  <em>{p.tags[0]}{p.status === 'Live' ? ' · live' : ''}</em>
                </span>
                <FiChevronRight size={13} aria-hidden="true" />
              </li>
            ))}
          </ul>

          <div className="phone__bar" aria-hidden="true" />
        </div>
      </div>

      <p className="phone__caption">
        Live data, real Ethiopian date. Built with the same package I published.
      </p>
    </div>
  );
}
