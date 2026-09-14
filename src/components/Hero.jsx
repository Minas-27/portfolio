import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiMail, FiDownload, FiLinkedin, FiGithub, FiArrowDown } from 'react-icons/fi';
import { FaTelegramPlane } from 'react-icons/fa';
import { personalInfo, projects } from '../data/content';
import PhoneShowcase from './PhoneShowcase';
import './Hero.css';

const liveCount = projects.filter((p) => p.status === 'Live').length;

const FACTS = [
  { value: liveCount, label: 'projects shipped', count: true },
  { value: 7, label: 'packages on pub.dev', count: true },
  { value: 2027, label: 'graduating' },
];

/* Counts up once on mount. The two small numbers are the credibility
   markers, so they earn a moment of attention; the year does not. */
function Tally({ to, enabled }) {
  const [n, setN] = useState(enabled ? 0 : to);
  useEffect(() => {
    if (!enabled) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / 900);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, enabled]);
  return <>{n}</>;
}

export default function Hero() {
  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
  };
  const up = {
    hidden: { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="hero" id="hero">
      <div className="hero__grid-lines" aria-hidden="true" />
      <div className="hero__bg-glow" aria-hidden="true" />

      <motion.div
        className="hero__inner container hero__inner--split"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        <div className="hero__copy">
        <motion.h1 className="hero__name" variants={up}>
          I build <em>mobile apps</em><br />
          people actually use.
        </motion.h1>

        <motion.p className="hero__lede" variants={up}>
          {personalInfo.valueProp}
        </motion.p>

        <motion.div className="hero__ctas" variants={up}>
          <a href={`mailto:${personalInfo.email}`} className="btn btn--primary" id="hero-contact-cta">
            <FiMail size={15} /> Work with me
          </a>
          <a href={personalInfo.resumes.main} className="btn btn--secondary" download id="hero-download-resume">
            <FiDownload size={15} /> Resume
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__icon-link"
            aria-label="LinkedIn"
            id="hero-linkedin"
          >
            <FiLinkedin size={17} />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__icon-link"
            aria-label="GitHub"
            id="hero-github"
          >
            <FiGithub size={17} />
          </a>
          <a
            href={personalInfo.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__icon-link"
            aria-label="Telegram"
            id="hero-telegram"
          >
            <FaTelegramPlane size={17} />
          </a>
        </motion.div>

        <motion.dl className="hero__facts" variants={up}>
          {FACTS.map((f) => (
            <div key={f.label}>
              <dt><Tally to={f.value} enabled={!!f.count} /></dt>
              <dd>{f.label}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.div className="hero__marquee" variants={up} aria-hidden="true">
          <div className="hero__marquee-track">
            {[...personalInfo.roles, ...personalInfo.roles].map((r, i) => (
              <span key={i}>{r}<i>/</i></span>
            ))}
          </div>
        </motion.div>
        </div>

        <motion.div className="hero__device" variants={up}>
          <PhoneShowcase />
        </motion.div>
      </motion.div>

      <Link
        to="about"
        smooth
        duration={600}
        offset={-80}
        className="hero__scroll"
        tabIndex={0}
        aria-label="Scroll to about"
      >
        <FiArrowDown size={14} />
      </Link>
    </section>
  );
}
