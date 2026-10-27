import { useRef } from 'react';
import { skillGroups, personalInfo, sectionCopy } from '../data/content';
import { useReveal } from '../lib/motion';
import SectionHead from './SectionHead';
import './About.css';

const copy = sectionCopy.about;

export default function About() {
  const root = useRef(null);
  useReveal(root);

  return (
    <section className="about section" id="about" ref={root} aria-labelledby="about-title">
      <div className="wrap">
        <SectionHead id="about" copy={copy} titleId="about-title" lede={null} />

        <div className="about__grid">
          <figure className="about__photo js-clip">
            <img
              src={personalInfo.profilePhoto}
              alt={`Portrait of ${personalInfo.name}`}
              loading="lazy"
              width="853"
              height="972"
            />
            <figcaption className="t-meta">{personalInfo.name}</figcaption>
          </figure>

          <div className="about__body">
            {personalInfo.about.map((para) => (
              <p key={para.slice(0, 24)} className="about__statement js-lines">{para}</p>
            ))}

            <div className="skills">
              <h3 className="t-label skills__title">{copy.skills}</h3>
              <dl className="skills__list js-stagger">
                {skillGroups.map((g) => (
                  <div key={g.label} className="skills__row">
                    <dt className="t-meta">{g.label}</dt>
                    <dd>
                      <ul>
                        {g.items.map((s) => <li key={s}>{s}</li>)}
                      </ul>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
