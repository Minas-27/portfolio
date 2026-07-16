import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-scroll';
import { FiMail, FiLinkedin, FiPhone, FiMapPin } from 'react-icons/fi';
import { personalInfo } from '../data/content';
import './Contact.css';

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <section className="contact section" id="contact" ref={ref}>
      <div className="container">
        <motion.div initial="hidden" animate={inView ? 'visible' : 'hidden'} variants={fadeUp}>
          <p className="section-label">Contact</p>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Open to remote opportunities. If you have a project in mind or just want to connect, I'd love to hear from you.
          </p>
        </motion.div>

        <motion.div
          className="contact__grid"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
        >
          <motion.a
            href={`mailto:${personalInfo.email}`}
            className="contact__card card"
            variants={fadeUp}
            id="contact-email"
          >
            <FiMail size={24} className="contact__icon" />
            <h3>Email</h3>
            <p>{personalInfo.email}</p>
          </motion.a>

          <motion.a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__card card"
            variants={fadeUp}
            id="contact-linkedin"
          >
            <FiLinkedin size={24} className="contact__icon" />
            <h3>LinkedIn</h3>
            <p>abraham-addisu</p>
          </motion.a>

          <motion.a 
            href={`tel:${personalInfo.phone}`}
            className="contact__card card" 
            variants={fadeUp}
          >
            <FiPhone size={24} className="contact__icon" />
            <h3>Phone</h3>
            <p>{personalInfo.phone}</p>
          </motion.a>

          <motion.a 
            href={`https://maps.google.com/?q=${personalInfo.location}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact__card card" 
            variants={fadeUp}
          >
            <FiMapPin size={24} className="contact__icon" />
            <h3>Location</h3>
            <p>{personalInfo.location}</p>
          </motion.a>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="footer" role="contentinfo">
        <div className="container footer__inner">
          <nav className="footer__links" aria-label="Footer navigation">
            {['hero', 'about', 'experience', 'projects', 'certifications', 'contact'].map((s) => (
              <Link key={s} to={s} smooth duration={600} offset={-80} className="footer__link" tabIndex={0}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Link>
            ))}
          </nav>

          <p className="footer__copy">
            © {new Date().getFullYear()} Abraham Addisu. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
