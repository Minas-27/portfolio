import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { FiMail, FiDownload, FiLinkedin, FiGithub, FiExternalLink } from 'react-icons/fi';
import { personalInfo } from '../data/content';
import './Hero.css';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const currentRole = personalInfo.roles[roleIndex];

  useEffect(() => {
    let timeout;
    if (!deleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 70);
    } else if (!deleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (deleting && charIndex === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % personalInfo.roles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, currentRole, roleIndex]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="hero section" id="hero">
      <div className="hero__bg-glow" aria-hidden="true" />
      <motion.div
        className="hero__content container"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p className="hero__greeting" variants={fadeUp}>
          Hello, I'm
        </motion.p>

        <motion.h1 className="hero__name" variants={fadeUp}>
          {personalInfo.name}
        </motion.h1>

        <motion.div className="hero__role-wrapper" variants={fadeUp}>
          <span className="hero__role-text">
            {currentRole.slice(0, charIndex)}
          </span>
          <span className="hero__cursor" aria-hidden="true">|</span>
        </motion.div>

        <motion.p className="hero__value-prop" variants={fadeUp}>
          {personalInfo.valueProp}
        </motion.p>

        <motion.div className="hero__ctas" variants={fadeUp}>
          <a
            href={`mailto:${personalInfo.email}`}
            className="btn btn--primary"
            id="hero-contact-cta"
          >
            <FiMail size={16} /> Contact Me
          </a>
          <a
            href={personalInfo.resumes.main}
            className="btn btn--secondary"
            download
            id="hero-download-resume"
          >
            <FiDownload size={16} /> Download Resume
          </a>
        </motion.div>

        <motion.div className="hero__socials" variants={fadeUp}>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social-link"
            aria-label="LinkedIn profile"
            id="hero-linkedin"
          >
            <FiLinkedin size={20} />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social-link"
            aria-label="GitHub profile"
            id="hero-github"
          >
            <FiGithub size={20} />
          </a>
          <a
            href={personalInfo.upwork}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__social-link"
            aria-label="Upwork profile"
            id="hero-upwork"
          >
            <FiExternalLink size={20} />
          </a>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Link
            to="about"
            smooth
            duration={600}
            offset={-80}
            className="hero__scroll-hint"
            tabIndex={0}
            aria-label="Scroll to about section"
          >
            <span className="hero__scroll-arrow" aria-hidden="true">↓</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
