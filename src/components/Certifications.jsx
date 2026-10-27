import { useRef, useState } from 'react';
import { ArrowUpRight, X } from 'lucide-react';
import { certifications, issuerLogos, sectionCopy } from '../data/content';
import { useReveal } from '../lib/motion';
import useBodyLock, { usePresence } from '../lib/useBodyLock';
import SectionHead from './SectionHead';
import './Certifications.css';

const copy = sectionCopy.certifications;
const pad = (n) => String(n).padStart(2, '0');

function Viewer({ cert, state, onClose }) {
  const box = useRef(null);
  useBodyLock(state === 'open', onClose, box);

  return (
    <div
      className="certview"
      data-state={state}
      data-modal
      role="dialog"
      aria-modal="true"
      aria-label={cert.title}
      data-lenis-prevent
      ref={box}
      onClick={onClose}
    >
      <div className="certview__bar wrap" onClick={(e) => e.stopPropagation()}>
        <p className="t-label certview__caption">
          {cert.title}
          <span> / {cert.issuer}</span>
        </p>
        <button className="certview__close t-label" onClick={onClose}>
          Close <X size={16} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
      <figure className="certview__stage">
        <img
          src={cert.image}
          alt={`Certificate: ${cert.title}, ${cert.issuer}`}
          onClick={(e) => e.stopPropagation()}
        />
      </figure>
    </div>
  );
}

export default function Certifications() {
  const root = useRef(null);
  const [selected, setSelected] = useState(null);
  const [shown, setShown] = useState(null);
  const [mounted, state] = usePresence(!!selected, 500);
  useReveal(root);

  const open = (cert) => {
    setShown(cert);
    setSelected(cert);
  };

  return (
    <section className="certs section" id="certifications" ref={root} aria-labelledby="certs-title">
      <div className="wrap">
        <SectionHead id="certifications" copy={copy} titleId="certs-title" />

        <ol className="certs__list">
          {certifications.map((cert, i) => {
            const logo = cert.image ? null : issuerLogos[cert.issuer];
            const action = cert.link ? (
              <a
                href={cert.link}
                className="cert__action ulink"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View credential for ${cert.title}`}
              >
                Credential <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" />
              </a>
            ) : cert.image ? (
              <button
                className="cert__action ulink"
                onClick={() => open(cert)}
                aria-label={`View certificate image for ${cert.title}`}
              >
                Certificate <ArrowUpRight size={12} strokeWidth={1.5} aria-hidden="true" />
              </button>
            ) : null;

            return (
              <li key={cert.title} className="cert">
                <span className="cert__index t-meta tabular" aria-hidden="true">{pad(i + 1)}</span>
                <div className="cert__main">
                  <h3 className="cert__title">
                    {cert.image && (
                      <button
                        type="button"
                        className="cert__thumb"
                        onClick={() => open(cert)}
                        aria-label={`Preview certificate for ${cert.title}`}
                      >
                        <img src={cert.image} alt="" />
                      </button>
                    )}
                    {logo && (
                      <a
                        className="cert__thumb cert__thumb--logo"
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${cert.issuer} logo, view credential for ${cert.title}`}
                      >
                        <img src={logo} alt="" />
                      </a>
                    )}
                    <span>{cert.title}</span>
                  </h3>
                  <p className="cert__meta t-meta">
                    {cert.issuer}
                    <span aria-hidden="true"> / </span>
                    <span className="tabular">{cert.date}</span>
                  </p>
                  {cert.detail && <p className="cert__detail">{cert.detail}</p>}
                </div>
                {action}
              </li>
            );
          })}
        </ol>
      </div>

      {mounted && shown && <Viewer cert={shown} state={state} onClose={() => setSelected(null)} />}
    </section>
  );
}
