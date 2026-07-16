import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin } from 'lucide-react';
import { experiences } from '../data/content';
import './Experience.css';

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="experience section" id="experience" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I've Worked</h2>
        </motion.div>

        <div className="experience__timeline">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="experience__item"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
            >
              <div className="experience__dot" aria-hidden="true" />
              <div className="experience__card card">
                <div className="experience__header">
                  <h3 className="experience__title">{exp.title}</h3>
                  {exp.company && (
                    <span className="experience__company">{exp.company}</span>
                  )}
                </div>
                <div className="experience__meta">
                  <span className="experience__date">{exp.date}</span>
                  {exp.location && (
                    <span className="experience__location">
                      <MapPin size={14} color="currentColor" strokeWidth={1.5} />
                      {exp.location}
                    </span>
                  )}
                </div>
                <p className="experience__description">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
