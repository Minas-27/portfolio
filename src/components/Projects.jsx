import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowRight, X } from 'lucide-react';
import { projects, sectionCopy } from '../data/content';
import { gsap, useReveal } from '../lib/motion';
import useBodyLock, { usePresence } from '../lib/useBodyLock';
import PhoneShowcase from './PhoneShowcase';
import SectionHead from './SectionHead';
import ProjectVisual, { Gallery, shortName } from './Device';
import './Projects.css';

const copy = sectionCopy.projects;
const pad = (n) => String(n).padStart(2, '0');

/* Featured projects get the full stage. The rest close the reel. */
const SELECTED = projects.filter((p) => p.featured);
const MORE = projects.filter((p) => !p.featured);
const ORDER = [...SELECTED, ...MORE];
const HORIZONTAL = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

const ctaLabel = (link) =>
  link.includes('play.google') ? 'View on Google Play'
    : link.includes('pub.dev') ? 'View on pub.dev'
    : link.includes('github') ? 'View source'
    : link.includes('linkedin') ? 'View the post'
    : 'View project';

function Detail({ project, index, state, onClose }) {
  const panel = useRef(null);
  useBodyLock(state === 'open', onClose, panel);

  return (
    <div
      className="pdetail"
      data-state={state}
      data-modal
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdetail-title"
      data-lenis-prevent
      ref={panel}
    >
      <div className="pdetail__bar wrap">
        <span className="t-label tabular">
          ({pad(index + 1)}) <span className="pdetail__of">/ {pad(ORDER.length)}</span>
        </span>
        <button className="pdetail__close t-label" onClick={onClose}>
          Close <X size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>

      <div className="pdetail__grid wrap">
        <div className="pdetail__text">
          <p className="pdetail__meta t-label">
            <span>{project.role}</span>
            {project.status && <span className={`pstatus${project.status === 'Live' ? '' : ' is-other'}`}>{project.status}</span>}
          </p>
          <h2 className="pdetail__title" id="pdetail-title">{project.title}</h2>
          <p className="t-body pdetail__desc">{project.description}</p>
          <ul className="tags" aria-label="Built with">
            {project.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn--solid pdetail__cta" data-magnetic="0.15">
              {ctaLabel(project.link)} <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="pdetail__media">
          <div className="pdetail__hero">
            <ProjectVisual project={project} size="detail" />
          </div>
          <Gallery project={project} />
        </div>
      </div>
    </div>
  );
}

function Card({ project, index, onOpen }) {
  return (
    <article
      className="pcard"
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      role="button"
      tabIndex={0}
      data-cursor="Open"
      aria-label={`Open ${project.title}`}
    >
      <div className="pcard__copy">
        <p className="pcard__meta t-label">
          <span className="tabular">{pad(index + 1)}</span>
          <span>{project.role}</span>
          {project.status && <span className={`pstatus${project.status === 'Live' ? '' : ' is-other'}`}>{project.status}</span>}
        </p>
        <h3 className="pcard__title t-title-lg">{shortName(project.title)}</h3>
        <p className="pcard__sum">{project.summary}</p>
        <ul className="tags" aria-label="Built with">
          {project.tags.slice(0, 3).map((t) => <li key={t}>{t}</li>)}
        </ul>
      </div>
      <div className="pcard__visual">
        <ProjectVisual project={project} />
      </div>
    </article>
  );
}

export default function Projects() {
  const root = useRef(null);
  const pin = useRef(null);
  const track = useRef(null);
  const counter = useRef(null);
  const bar = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const [shown, setShown] = useState(null);
  const [mounted, state] = usePresence(openIndex !== null, 700);

  useEffect(() => {
    if (openIndex !== null) setShown(openIndex);
  }, [openIndex]);

  /* The phone in the reel can ask us to open a project. */
  useEffect(() => {
    const onOpen = (e) => {
      const i = ORDER.findIndex((p) => p.title === e.detail);
      if (i > -1) setOpenIndex(i);
    };
    window.addEventListener('open-project', onOpen);
    return () => window.removeEventListener('open-project', onOpen);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(HORIZONTAL);
    const apply = () => root.current?.classList.toggle('work--pin', mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);

  useReveal(root, () => {
    const mm = gsap.matchMedia();
    mm.add(HORIZONTAL, () => {
      const distance = () => track.current.scrollWidth - window.innerWidth;
      const cards = gsap.utils.toArray('.pcard', track.current);
      gsap.to(track.current, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: pin.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${distance()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            let best = 0;
            let bestD = Infinity;
            cards.forEach((c, i) => {
              const r = c.getBoundingClientRect();
              const d = Math.abs(r.left + r.width / 2 - window.innerWidth / 2);
              if (d < bestD) {
                bestD = d;
                best = i;
              }
            });
            if (counter.current) counter.current.textContent = pad(Math.min(best + 1, SELECTED.length));
          },
        },
      });
    });
  });

  return (
    <section className="work section" id="projects" ref={root} aria-labelledby="projects-title">
      <div className="work__pin" ref={pin}>
        <div className="work__hud wrap">
          <span />
          <p className="work__counter t-meta tabular" aria-hidden="true">
            <b ref={counter}>01</b>
            <span> / {pad(SELECTED.length)}</span>
          </p>
        </div>

        <div className="work__track" ref={track}>
          <div className="work__intro">
            <SectionHead id="projects" copy={copy} titleId="projects-title" className="shead--compact" />
            <div className="work__phone">
              <PhoneShowcase />
            </div>
          </div>

          {SELECTED.map((p) => (
            <Card
              key={p.title}
              project={p}
              index={ORDER.indexOf(p)}
              onOpen={() => setOpenIndex(ORDER.indexOf(p))}
            />
          ))}

          <div className="pmore">
            <p className="t-label pmore__label">{copy.more}</p>
            <ul>
              {MORE.map((p) => (
                <li key={p.title}>
                  <button className="pmore__row" onClick={() => setOpenIndex(ORDER.indexOf(p))}>
                    <span className="t-meta tabular">{pad(ORDER.indexOf(p) + 1)}</span>
                    <span className="pmore__name">{shortName(p.title)}</span>
                    <span className="pmore__sum">{p.summary}</span>
                    <ArrowRight size={16} strokeWidth={1.5} aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="work__progress wrap t-meta" aria-hidden="true">
          <span>Start</span>
          <div className="work__bar"><i ref={bar} /></div>
          <span>End</span>
        </div>
      </div>

      {mounted && shown !== null && (
        <Detail project={ORDER[shown]} index={shown} state={state} onClose={() => setOpenIndex(null)} />
      )}
    </section>
  );
}
