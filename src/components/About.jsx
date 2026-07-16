import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills, currentlyLearning, personalInfo } from '../data/content';
import './About.css';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.05, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  return (
    <section className="about section" id="about" ref={ref}>
      <div className="container">
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
        >
          <p className="section-label">About</p>
          <h2 className="section-title">Who I Am</h2>
        </motion.div>

        <div className="about__grid">
          <motion.div
            className="about__photo-wrapper"
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp}
            custom={1}
          >
            {personalInfo.profilePhoto ? (
              <img src={personalInfo.profilePhoto} alt={`Profile photo of ${personalInfo.name}`} className="about__photo-img" />
            ) : (
              <div className="about__photo-placeholder" aria-label="Profile photo placeholder">
                <span>A</span>
              </div>
            )}
          </motion.div>

          <div className="about__text-col">
            <motion.p
              className="about__narrative"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={2}
            >
              With over two years of hands-on experience building production mobile apps - both native Android with Kotlin and Jetpack Compose, and cross-platform with Flutter - I focus on understanding the full picture before writing a single line of code. From requirements gathering through architecture design to implementation and deployment, I treat every project as a system to be thoughtfully engineered, not just coded.
            </motion.p>

            <motion.p
              className="about__narrative"
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={3}
            >
              Currently a Full Stack Engineer (Mobile App focus) at Medco Technology Solutions, I build client-facing medical and insurance applications. I'm also pursuing my B.Sc. in Software Engineering at Bahir Dar University (2023–2027), maintaining an active open-source project on pub.dev, and delivering freelance work on Upwork with a 5.0-star rating.
            </motion.p>

          </div>
        </div>

        <motion.div
          className="about__skills"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          custom={4}
        >
          <h3 className="about__skills-title">Core Skills</h3>
          <div className="about__skills-grid">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                className="pill"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4 + i * 0.04, duration: 0.3 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
