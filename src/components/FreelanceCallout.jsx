import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiStar, FiExternalLink } from 'react-icons/fi';
import { freelanceRecord } from '../data/content';
import './FreelanceCallout.css';

export default function FreelanceCallout() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <motion.section
      className="freelance"
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      aria-label="Freelance track record"
    >
      <div className="container">
        <div className="freelance__strip">
          <div className="freelance__left">
            <div className="freelance__rating">
              <FiStar size={18} className="freelance__star" />
              <span className="freelance__rating-value">{freelanceRecord.rating}</span>
              <span className="freelance__rating-label">on Upwork</span>
            </div>
            <p className="freelance__project">
              {freelanceRecord.completedProjects} completed project - {freelanceRecord.projectName} ({freelanceRecord.projectDate})
            </p>
            <p className="freelance__quote">
              "{freelanceRecord.clientQuote}"
            </p>
          </div>

          <div className="freelance__right">
            <div className="freelance__tags">
              {freelanceRecord.endorsedTags.map((tag) => (
                <span key={tag} className="pill">{tag}</span>
              ))}
            </div>
            <a
              href={freelanceRecord.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="freelance__link"
              id="freelance-upwork-link"
            >
              View on Upwork <FiExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
