import { useRef } from 'react';
import { Calendar, Building2, MapPin } from 'lucide-react';
import { experiences, sectionCopy } from '../data/content';
import { gsap, useReveal } from '../lib/motion';
import SectionHead from './SectionHead';
import Expand from './Expand';
import './Experience.css';

const copy = sectionCopy.experience;
const pad = (n) => String(n).padStart(2, '0');

export default function Experience() {
  const root = useRef(null);

  useReveal(root, (el) => {
    const spine = el.querySelector('.xp__spine i');
    const tree = el.querySelector('.xp');
    if (spine && tree) {
      gsap.fromTo(
        spine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: tree, start: 'top 70%', end: 'bottom 65%', scrub: true },
        },
      );
    }

    gsap.utils.toArray('.xp__item', el).forEach((item) => {
      const card = item.querySelector('.xp__card');
      const left = item.classList.contains('xp__item--left');
      const desktop = window.matchMedia('(min-width: 960px)').matches;
      const from = desktop && left ? 'inset(0% 0% 0% 100%)' : 'inset(0% 100% 0% 0%)';
      const tl = gsap.timeline({ scrollTrigger: { trigger: item, start: 'top 82%', once: true } });
      tl.from(item.querySelector('.xp__node'), { scale: 0, rotate: 90, duration: 0.6, ease: 'back.out(2.2)' })
        .from(item.querySelector('.xp__link'), { scaleX: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .from(card, { clipPath: from, duration: 1.1, ease: 'expo.inOut', clearProps: 'clipPath' }, '-=0.25')
        .from(card.querySelectorAll('.xp__ghost, .xp__date, .xp__title, .xp__type, .xp__line, .xp__desc'), {
          y: 22,
          opacity: 0,
          duration: 0.8,
          ease: 'expo.out',
          stagger: 0.05,
          clearProps: 'transform,opacity',
        }, '-=0.55');
    });
  });

  return (
    <section className="experience section" id="experience" ref={root} aria-labelledby="experience-title">
      <div className="wrap">
        <SectionHead id="experience" copy={copy} titleId="experience-title" lede={null} />

        <div className="xp">
          <span className="xp__spine" aria-hidden="true"><i /></span>
          <ol className="xp__list">
            {experiences.map((exp, i) => {
              const current = /present/i.test(exp.date);
              return (
                <li key={`${exp.title}-${exp.company}`} className={`xp__item xp__item--${i % 2 ? 'right' : 'left'}`}>
                  <span className="xp__node" aria-hidden="true" />
                  <span className="xp__link" aria-hidden="true" />
                  <article className="xp__card">
                    <span className="xp__ghost" aria-hidden="true">{pad(i + 1)}</span>
                    <p className="xp__date t-meta tabular">
                      <Calendar size={12} strokeWidth={1.5} aria-hidden="true" />
                      {exp.date}
                      {current && <span className="xp__now" aria-hidden="true" />}
                    </p>
                    <h3 className="xp__title">{exp.title}</h3>
                    {exp.type && <p className="xp__type t-meta">{exp.type}</p>}
                    <p className="xp__line">
                      <Building2 size={13} strokeWidth={1.5} aria-hidden="true" />
                      {exp.company}
                    </p>
                    {exp.location && (
                      <p className="xp__line">
                        <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
                        {exp.location}
                      </p>
                    )}
                    <Expand className="xp__desc" summary={exp.summary} detail={exp.description} points={exp.points} />
                  </article>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
