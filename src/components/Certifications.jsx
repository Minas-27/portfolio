import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink, FiX } from 'react-icons/fi';
import { Trophy, Medal, Microscope, Bot, Smartphone, Laptop, Rocket, Award, Image as ImageIcon } from 'lucide-react';
import { certifications } from '../data/content';
import './Certifications.css';

/* Simple icon mapping by issuer keyword */
function getIcon(issuer) {
  const props = { size: 24, strokeWidth: 1.5, color: 'currentColor' };
  
  if (issuer.includes('Hult')) return <Trophy {...props} />;
  if (issuer.includes('CoBuild')) return <Medal {...props} />;
  if (issuer.includes('IBM')) return <Microscope {...props} />;
  if (issuer.includes('Anthropic')) return <Bot {...props} />;
  if (issuer.includes('Udacity')) return <Smartphone {...props} />;
  if (issuer.includes('SLIIT')) return <Laptop {...props} />;
  if (issuer.includes('Cambridge') || issuer.includes('i-Teams')) return <Rocket {...props} />;
  return <Award {...props} />;
}

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="certifications section" id="certifications" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Recognition</p>
          <h2 className="section-title">Certifications & Awards</h2>
        </motion.div>

        <div className="certifications__grid">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              className="certifications__card card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="certifications__icon" aria-hidden="true">
                {getIcon(cert.issuer)}
              </span>
              <div className="certifications__info">
                <h3 className="certifications__title">{cert.title}</h3>
                <p className="certifications__issuer">{cert.issuer}</p>
                {cert.detail && (
                  <p className="certifications__detail">{cert.detail}</p>
                )}
              </div>
              {cert.link ? (
                <a
                  href={cert.link}
                  className="certifications__view-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View credential for ${cert.title}`}
                >
                  <FiExternalLink size={14} />
                  <span>View credential</span>
                </a>
              ) : cert.image ? (
                <button
                  onClick={() => setSelectedImage(cert.image)}
                  className="certifications__view-link"
                  aria-label={`View certificate image for ${cert.title}`}
                >
                  <ImageIcon size={14} />
                  <span>View certificate</span>
                </button>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="certifications__modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="certifications__modal-content"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="certifications__modal-close"
                onClick={() => setSelectedImage(null)}
                aria-label="Close certificate image"
              >
                <FiX size={24} />
              </button>
              <img src={selectedImage} alt="Certificate view" className="certifications__modal-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
