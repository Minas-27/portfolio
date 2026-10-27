import { useId, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { services, processSteps, freelanceRecord, personalInfo, sectionCopy } from '../data/content';
import { gsap, useReveal, ScrollTrigger } from '../lib/motion';
import SectionHead from './SectionHead';
import './Services.css';

const copy = sectionCopy.services;
const pad = (n) => String(n).padStart(2, '0');

function Service({ s, i, open, onToggle }) {
  const id = useId();
  return (
    <li className={`svc${open ? ' is-open' : ''}`} id={`service-${i + 1}`}>
      <button className="svc__head" aria-expanded={open} aria-controls={id} onClick={onToggle}>
        <span className="svc__parcel t-meta tabular" aria-hidden="true">
          <span className="svc__fold" />
          {pad(i + 1)}
        </span>
        <span className="svc__body">
          <span className="svc__title">{s.title}</span>
          <span className="svc__sum">{s.summary}</span>
        </span>
        <span className="svc__toggle" aria-hidden="true"><i /><i /></span>
      </button>
      <div className="svc__panel" id={id} role="region" aria-label={s.title}>
        <div>
          <p className="t-body">{s.description}</p>
        </div>
      </div>
    </li>
  );
}

export default function Services() {
  const root = useRef(null);
  const [open, setOpen] = useState(null);
  useReveal(root, (el) => {
    gsap.utils.toArray('.svc', el).forEach((row) => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: row, start: 'top 88%', once: true } });
      tl.from(row.querySelector('.svc__parcel'), { x: -72, rotate: -16, duration: 0.75, ease: 'back.out(1.7)' })
        .from(row.querySelector('.svc__body'), {
          clipPath: 'inset(0% 100% 0% 0%)',
          duration: 0.85,
          ease: 'expo.inOut',
          clearProps: 'clipPath',
        }, '-=0.42');
    });
    const ink = el.querySelector('.process__route i');
    const route = el.querySelector('.process');
    if (ink && route) {
      gsap.fromTo(ink, { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: route, start: 'top 80%', end: 'center 55%', scrub: true },
      });
    }
    const price = el.querySelector('.price');
    const priceInk = el.querySelector('.price__rule i');
    if (price && priceInk) {
      const tl = gsap.timeline({ scrollTrigger: { trigger: price, start: 'top 78%', once: true } });
      tl.fromTo(priceInk, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.inOut' });
      gsap.utils.toArray('.price__list li', price).forEach((item, i) => {
        tl.from(item, {
          clipPath: 'inset(0% 100% 0% 0%)',
          duration: 0.75,
          ease: 'expo.inOut',
          clearProps: 'clipPath',
        }, i === 0 ? '-=0.4' : '-=0.5');
      });
    }
  });

  const toggle = (i) => {
    setOpen((o) => (o === i ? null : i));
    // Heights below change; let scroll-linked motion re-measure.
    setTimeout(() => ScrollTrigger.refresh(), 650);
  };

  return (
    <section className="services section" id="services" ref={root} aria-labelledby="services-title">
      <div className="wrap">
        <SectionHead id="services" copy={copy} titleId="services-title" />

        <ol className="svc__list">
          {services.map((s, i) => (
            <Service key={s.title} s={s} i={i} open={open === i} onToggle={() => toggle(i)} />
          ))}
        </ol>

        <div className="process">
          <h3 className="process__title">{copy.process}</h3>
          <ol className="process__strip">
            <span className="process__route" aria-hidden="true"><i /></span>
            {processSteps.map((step, i) => (
              <li key={step}>
                <span className="process__n tabular">{pad(i + 1)}</span>
                <span className="process__name">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="price">
          <h3 className="price__title js-chars">{copy.pricing.title}</h3>
          <p className="price__note js-lines">{copy.pricing.note}</p>
          <ol className="price__list">
            <span className="price__rule" aria-hidden="true"><i /></span>
            {copy.pricing.points.map((point, i) => (
              <li key={point.title}>
                <span className="price__n tabular">{pad(i + 1)}</span>
                <span className="price__name">{point.title}</span>
                <p>{point.body}</p>
              </li>
            ))}
          </ol>
        </div>

        <figure className="proof js-clip">
          <div className="proof__score">
            <p className="proof__rating tabular">{freelanceRecord.rating}</p>
            <p className="t-meta">{copy.cta.rated.replace(/,$/, '')}</p>
          </div>
          <div className="proof__body">
            <blockquote className="proof__quote">“{freelanceRecord.clientQuote}”</blockquote>
            <figcaption className="t-meta">{freelanceRecord.projectName}</figcaption>
            <ul className="tags">
              {freelanceRecord.endorsedTags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="proof__actions">
            <a href={freelanceRecord.profileUrl} target="_blank" rel="noopener noreferrer" className="btn" data-magnetic="0.15">
              {copy.cta.profile} <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="btn btn--solid" data-magnetic="0.15">
              {copy.cta.talk} <ArrowUpRight size={15} strokeWidth={1.5} aria-hidden="true" />
            </a>
          </div>
        </figure>
      </div>
    </section>
  );
}
