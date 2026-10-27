import './Device.css';

/* Frames that make every project read as a product.

   - Screenshots with device: 'browser' sit in a browser window.
   - Phone apps without screenshots yet get a launch screen built only
     from real data (initials, name, role, stack, where it is live),
     with a second phone behind showing neutral placeholder blocks.
   - When real phone screenshots arrive (device: 'phone'), they replace
     the launch screen inside the same frame. */

export const shortName = (title) => title.split(/ - |: /)[0];

const initials = (title) =>
  shortName(title)
    .replace(/[^A-Za-z0-9 _]/g, ' ')
    .split(/[\s_]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

const host = (link) => {
  if (!link) return '';
  try {
    const h = new URL(link).hostname.replace(/^www\./, '');
    if (h.includes('play.google')) return 'Google Play';
    if (h.includes('github')) return 'GitHub';
    if (h.includes('linkedin')) return 'LinkedIn';
    return h;
  } catch {
    return '';
  }
};

export function BrowserFrame({ image, className = '', eager = false }) {
  return (
    <figure className={`browser ${className}`}>
      <div className="browser__bar" aria-hidden="true">
        <span className="browser__dots"><i /><i /><i /></span>
        <span className="browser__url">{image.url}</span>
      </div>
      <img src={image.src} alt={image.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </figure>
  );
}

function Splash({ project }) {
  return (
    <div className="splash">
      <span className={`splash__icon${project.icon ? ' splash__icon--img' : ''}`} aria-hidden="true">
        {project.icon ? <img src={project.icon} alt="" /> : initials(project.title)}
      </span>
      <strong className="splash__name">{shortName(project.title)}</strong>
      <span className="splash__role">{project.role}</span>
      <span className="splash__tags">
        {project.tags.slice(0, 3).map((t) => <i key={t}>{t}</i>)}
      </span>
      {project.status && (
        <span className={`splash__live${project.status === 'Live' ? '' : ' is-other'}`}>
          <b aria-hidden="true" /> {project.status}{host(project.link) ? ` · ${host(project.link)}` : ''}
        </span>
      )}
    </div>
  );
}

export function PhoneFrame({ project, image, ghost = false, className = '' }) {
  // A real screenshot sets the screen's shape, so nothing is cropped.
  const screenStyle = image?.w ? { aspectRatio: `${image.w} / ${image.h}` } : undefined;
  return (
    <div className={`phonef${ghost ? ' phonef--ghost' : ''}${image ? ' phonef--shot' : ''} ${className}`} aria-hidden={ghost || undefined}>
      <div className="phonef__screen" style={screenStyle}>
        <div className="phonef__status" aria-hidden="true">
          <span>9:41</span>
          <span className="phonef__island" />
          <span className="phonef__batt" />
        </div>
        {image ? (
          <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        ) : ghost ? (
          <div className="ghostui" aria-hidden="true">
            <i className="ghostui__head" />
            <i /><i /><i className="ghostui__short" />
            <i className="ghostui__card" />
            <i /><i className="ghostui__short" />
          </div>
        ) : (
          <Splash project={project} />
        )}
        <span className="phonef__home" aria-hidden="true" />
      </div>
    </div>
  );
}

/* A printed photo: paper border, real proportions. */
export function PhotoFrame({ image, className = '', eager = false }) {
  return (
    <figure className={`photo ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.w}
        height={image.h}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </figure>
  );
}

/* The composition used on cards and at the top of the detail page. */
export default function ProjectVisual({ project, size = 'card' }) {
  const shots = project.images || [];
  const web = shots.filter((i) => i.device === 'browser');
  const phones = shots.filter((i) => i.device === 'phone');
  const photos = shots.filter((i) => i.device === 'photo');

  if (photos.length) {
    return (
      <div className={`pvis pvis--photo pvis--${size}`}>
        {photos[1] && <PhotoFrame image={photos[1]} className="pvis__back" />}
        <PhotoFrame image={photos[0]} className="pvis__front" eager={size === 'detail'} />
      </div>
    );
  }

  if (web.length) {
    return (
      <div className={`pvis pvis--web pvis--${size}`}>
        {web[1] && <BrowserFrame image={web[1]} className="pvis__back" />}
        <BrowserFrame image={web[0]} className="pvis__front" eager={size === 'detail'} />
      </div>
    );
  }

  return (
    <div className={`pvis pvis--phone pvis--${size}`}>
      <PhoneFrame project={project} image={phones[1]} ghost={!phones[1]} className="pvis__back" />
      <PhoneFrame project={project} image={phones[0]} className="pvis__front" />
    </div>
  );
}

/* Every screenshot not already shown in the hero composition. */
export function Gallery({ project }) {
  const shots = project.images || [];
  const web = shots.filter((i) => i.device === 'browser').slice(1);
  const phones = shots.filter((i) => i.device === 'phone').slice(2);
  const photos = shots.filter((i) => i.device === 'photo').slice(2);
  if (!web.length && !phones.length && !photos.length) return null;
  return (
    <div className="gallery">
      {web.map((img) => <BrowserFrame key={img.alt} image={img} />)}
      {photos.length > 0 && (
        <div className="gallery__photos">
          {photos.map((img) => <PhotoFrame key={img.alt} image={img} />)}
        </div>
      )}
      {phones.length > 0 && (
        <div className="gallery__phones">
          {phones.map((img) => <PhoneFrame key={img.alt} project={project} image={img} />)}
        </div>
      )}
    </div>
  );
}
