import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiExternalLink } from 'react-icons/fi';
import { projects } from '../data/content';
import './Projects.css';

function StatusBadge({ status }) {
  if (!status) return null;
  const cls =
    status === 'Live' ? 'badge--live' : status === 'Internal' ? 'badge--internal' : 'badge--dev';
  return <span className={`badge ${cls}`}>{status}</span>;
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

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
            A selection of production apps, open-source tools, and hackathon winners.
          </p>
        </motion.div>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <motion.article
              key={project.title}
              className="projects__card card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.5,
                delay: i * 0.08,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <div className="projects__card-top">
                <StatusBadge status={project.status} />
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="projects__ext-link"
                    aria-label={`View ${project.title}`}
                  >
                    <FiExternalLink size={16} />
                  </a>
                )}
              </div>

              <h3 className="projects__card-title">{project.title}</h3>
              <p className="projects__card-role">{project.role}</p>
              <p className="projects__card-desc">{project.description}</p>

              <div className="projects__card-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="pill">
                    {tag}
                  </span>
                ))}
              </div>

              {project.linkNote && (
                <p className="projects__card-todo">
                  {/* Preserved TODO marker for Abraham */}
                  {project.linkNote}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
