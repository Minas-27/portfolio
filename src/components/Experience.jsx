import { useRef } from 'react';
import { Calendar, Building2, MapPin } from 'lucide-react';
import { experiences, sectionCopy } from '../data/content';
import { gsap, useReveal } from '../lib/motion';
import SectionHead from './SectionHead';
import Expand from './Expand';
import './Experience.css';

const copy = sectionCopy.experience;
const pad = (n) => String(n).padStart(2, '0');

function spanDates(roles) {
  const start = roles[roles.length - 1].date.split(/\s*[-–—]\s*/)[0].trim();
  const present = roles.some((r) => /present/i.test(r.date));
  const end = present ? 'Present' : roles[0].date.split(/\s*[-–—]\s*/).pop().trim();
  return `${start} - ${end}`;
}

function groupExperiences(list) {
  const groups = [];
  for (const exp of list) {
    const last = groups.at(-1);
    if (last && last.company === exp.company) last.roles.push(exp);
    else groups.push({ company: exp.company, location: exp.location, roles: [exp] });
  }
  return groups.map((g) => ({
    ...g,
    date: spanDates(g.roles),
    current: g.roles.some((r) => /present/i.test(r.date)),
  }));
}

function Role({ role, nested = false }) {
  return (
    <div className={`xp__role${nested ? ' xp__role--nested' : ''}`}>
      {nested && (
        <>
          <h4 className="xp__role-title">{role.title}</h4>
          {role.type && <p className="xp__type t-meta">{role.type}</p>}
          <p className="xp__role-date t-meta tabular">
            <Calendar size={12} strokeWidth={1.5} aria-hidden="true" />
            {role.date}
          </p>
        </>
      )}
      <Expand className="xp__desc" summary={role.summary} detail={role.description} points={role.points} />
    </div>
  );
}

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
        .from(card.querySelectorAll('.xp__ghost, .xp__date, .xp__title, .xp__type, .xp__line, .xp__role, .xp__desc'), {
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
            {groupExperiences(experiences).map((group, i) => {
              const many = group.roles.length > 1;
              return (
                <li key={group.company} className={`xp__item xp__item--${i % 2 ? 'right' : 'left'}`}>
                  <span className="xp__node" aria-hidden="true" />
                  <span className="xp__link" aria-hidden="true" />
                  <article className="xp__card">
                    <span className="xp__ghost" aria-hidden="true">{pad(i + 1)}</span>
                    <p className="xp__date t-meta tabular">
                      <Calendar size={12} strokeWidth={1.5} aria-hidden="true" />
                      {group.date}
                      {group.current && <span className="xp__now" aria-hidden="true" />}
                    </p>
                    {many ? (
                      <>
                        <h3 className="xp__title">{group.company}</h3>
                        {group.location && (
                          <p className="xp__line">
                            <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
                            {group.location}
                          </p>
                        )}
                        <div className="xp__roles">
                          {group.roles.map((role) => (
                            <Role key={role.title} role={role} nested />
                          ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <h3 className="xp__title">{group.roles[0].title}</h3>
                        {group.roles[0].type && <p className="xp__type t-meta">{group.roles[0].type}</p>}
                        <p className="xp__line">
                          <Building2 size={13} strokeWidth={1.5} aria-hidden="true" />
                          {group.company}
                        </p>
                        {group.location && (
                          <p className="xp__line">
                            <MapPin size={13} strokeWidth={1.5} aria-hidden="true" />
                            {group.location}
                          </p>
                        )}
                        <Role role={group.roles[0]} />
                      </>
                    )}
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
