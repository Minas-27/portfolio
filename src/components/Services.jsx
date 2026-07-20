import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services, processSteps, upworkProfile } from '../data/content';
import './Services.css';

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section className="services section" id="services" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Services</p>
          <h2 className="section-title">What I Can Deliver</h2>
          <p className="section-subtitle">
            Every project starts with understanding the problem, not writing code — I take full ownership from planning to deployment.
          </p>
        </motion.div>

        <div className="services__grid">
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              className="services__card card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-desc">{service.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="services__process"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="services__process-title">How I Work</h3>
          <div className="services__process-strip">
            {processSteps.map((step, i) => (
              <div key={step} className="services__process-step">
                <div className="services__process-dot" aria-hidden="true" />
                <span className="services__process-label">{step}</span>
                {i < processSteps.length - 1 && (
                  <span className="services__process-arrow">→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="services__cta"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <p>
            5-star rated on Upwork — <a href={upworkProfile} target="_blank" rel="noopener noreferrer">View Profile</a>. Have a project in mind? <a href="mailto:abrahamaddisu217@gmail.com" className="btn btn--primary services__cta-btn">Let's talk &rarr;</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
