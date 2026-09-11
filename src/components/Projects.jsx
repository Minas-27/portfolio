import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiX, FiArrowUpRight } from 'react-icons/fi';
import { projects } from '../data/content';
import useTilt from '../lib/useTilt';
import useBodyLock from '../lib/useBodyLock';
import './Projects.css';

function StatusBadge({ status }) {
  if (!status) return null;
  const cls =
    status === 'Live' ? 'badge--live' : status === 'Internal' ? 'badge--internal' : 'badge--dev';
  return <span className={`badge ${cls}`}>{status}</span>;
}

const spring = { type: 'spring', stiffness: 320, damping: 34 };

function ProjectCard({ project, index, inView, onOpen }) {
  const { ref, handlers, style } = useTilt();

  return (
    <motion.article
      ref={ref}
      layoutId={`card-${project.title}`}
      className="projects__card card card--tilt"
      style={{ ...tint(hueFor(project.tags)), ...style }}
      role="button"
      tabIndex={0}
      aria-label={`Open ${project.title}`}
      onClick={onOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      {...handlers}
    >
      <span className="card__sheen" aria-hidden="true" />

      <div className="projects__card-top card__z1">
        <span className="projects__index">{String(index + 1).padStart(2, '0')}</span>
        <StatusBadge status={project.status} />
        <span className="projects__open" aria-hidden="true">
          <FiArrowUpRight size={15} />
        </span>
      </div>

      <motion.h3 layoutId={`title-${project.title}`} className="projects__card-title card__z2">
        {project.title}
      </motion.h3>
      <p className="projects__card-role card__z1">{project.role}</p>
      <p className="projects__card-desc">{project.description}</p>

      <div className="projects__card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="pill">{tag}</span>
        ))}
      </div>
    </motion.article>
  );
}

/* Each project takes a hue from what it is actually made of, so the
   colour carries information instead of decorating. Hue only, the
   lightness and saturation stay fixed so nothing clashes with the
   amber system accent. */
const PALETTE = [
  { hue: 265, match: ['AI', 'NLP', 'Machine Learning'] },          // violet, AI work
  { hue: 162, match: ['Open Source', 'pub.dev', 'Dart'] },         // teal, open source
  { hue: 14,  match: ['Embedded Systems', 'IoT', 'C++', 'Sensors'] }, // rust, hardware
  { hue: 205, match: ['JSON', 'API Integration', 'Telegram API'] },  // blue, integrations
  { hue: 38,  match: ['Kotlin', 'Flutter', 'Jetpack Compose'] },     // amber, mobile
];

function hueFor(tags = []) {
  for (const { hue, match } of PALETTE) {
    if (tags.some((t) => match.includes(t))) return hue;
  }
  return 38;
}

const tint = (h) => ({
  '--p-hue': h,
  '--p-color': `hsl(${h} 72% 62%)`,
  '--p-soft': `hsl(${h} 72% 62% / 0.13)`,
  '--p-line': `hsl(${h} 72% 62% / 0.38)`,
});

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });
  const [open, setOpen] = useState(null);

  useBodyLock(!!open, () => setOpen(null));

  /* The phone in the hero can ask us to open a project. */
  useEffect(() => {
    const onOpen = (e) => {
      const match = projects.find((p) => p.title === e.detail);
      if (match) setOpen(match);
    };
    window.addEventListener('open-project', onOpen);
    return () => window.removeEventListener('open-project', onOpen);
  }, []);

  return (
    <section className="projects section" id="projects" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Projects</p>
          <h2 className="section-title">What I've Built</h2>
          <p className="section-subtitle">
            Apps that shipped, packages people can install, and one piece of hardware
            that spent a month measuring a television. Tap any of them to open it.
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              inView={inView}
              onOpen={() => setOpen(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key={open.title}
            data-modal
            className="projects__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setOpen(null)}
          >
            <motion.article
              layoutId={`card-${open.title}`}
              className="projects__detail card"
              style={tint(hueFor(open.tags))}
              transition={spring}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={open.title}
            >
              <button
                className="projects__close"
                onClick={() => setOpen(null)}
                aria-label="Close"
              >
                <FiX size={18} />
              </button>

              <div className="projects__detail-aura" aria-hidden="true" />

              <div className="projects__detail-top">
                <StatusBadge status={open.status} />
                <span className="projects__detail-role">{open.role}</span>
              </div>

              <motion.h3 layoutId={`title-${open.title}`} className="projects__detail-title">
                {open.title}
              </motion.h3>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12, duration: 0.3 }}
              >
                <p className="projects__detail-desc">{open.description}</p>

                <p className="projects__detail-label">Built with</p>
                <div className="projects__card-tags">
                  {open.tags.map((tag, t) => (
                    <motion.span
                      key={tag}
                      className="pill"
                      initial={{ opacity: 0, y: 8, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.2 + t * 0.05, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {open.link && (
                  <a
                    href={open.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--primary projects__detail-cta"
                  >
                    <FiExternalLink size={15} />
                    {open.link.includes('play.google') ? 'View on Google Play'
                      : open.link.includes('pub.dev') ? 'View on pub.dev'
                      : open.link.includes('github') ? 'View source'
                      : 'View project'}
                  </a>
                )}
              </motion.div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
