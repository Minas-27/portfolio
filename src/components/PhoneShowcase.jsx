import { useEffect, useRef, useState } from 'react';
import { Search, Wifi } from 'lucide-react';
import { addisNow } from '../lib/ethiopian';
import dagaIcon from '../assets/projects/daga-icon.webp';
import hireaiIcon from '../assets/projects/hireai-launcher.webp';
import addisIcon from '../assets/projects/addis-launcher.webp';
import scannerIcon from '../assets/projects/scanner-icon.webp';
import './PhoneShowcase.css';

/* Home screen of the mobile apps only. Packages and hardware stay off it.
   Icons are the real launcher marks. Swipe the icon pages. */

const HOME = [
  { title: 'Daga Taxi', label: 'Daga Taxi', icon: dagaIcon },
  { title: 'HireAI - Bilingual AI Recruitment Platform', label: 'HireAI', icon: hireaiIcon },
  { title: 'Addis 360', label: 'Addis 360', icon: addisIcon },
  { title: 'Custom Odoo ERP Mobile Inventory Scanner', label: 'Scanner', icon: scannerIcon },
];

const PER_PAGE = 4;
const PAGES = Array.from({ length: Math.ceil(HOME.length / PER_PAGE) }, (_, i) =>
  HOME.slice(i * PER_PAGE, (i + 1) * PER_PAGE),
);

const ANDROID = 'M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z';
const APPLE = 'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701';

function openProject(title) {
  if (!title) return;
  window.dispatchEvent(new CustomEvent('open-project', { detail: title }));
}

function AppIcon({ app, labeled = false, moved }) {
  return (
    <button
      type="button"
      data-title={app.title}
      aria-label={`Open ${app.label}`}
      onClick={() => {
        if (moved && Math.abs(moved.current) > 8) return;
        openProject(app.title);
      }}
    >
      <img src={app.icon} alt="" draggable="false" />
      {labeled && <span>{app.label}</span>}
    </button>
  );
}

function Mark({ d, label, className }) {
  return (
    <span className={className} aria-label={label}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
    </span>
  );
}

export default function PhoneShowcase() {
  const [now, setNow] = useState(() => new Date());
  const [page, setPage] = useState(0);
  const [drag, setDrag] = useState(0);
  const [dragging, setDragging] = useState(false);
  const gesture = useRef({ x: 0, dx: 0, active: false, captured: false });
  const moved = useRef(0);

  useEffect(() => {
    const clock = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(clock);
  }, []);

  const addis = addisNow(now);
  const weekday = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Addis_Ababa',
    weekday: 'short',
    day: 'numeric',
    month: 'long',
  }).format(now);

  const go = (next) => setPage(Math.max(0, Math.min(PAGES.length - 1, next)));

  const onPointerDown = (e) => {
    if (e.button != null && e.button !== 0) return;
    gesture.current = { x: e.clientX, dx: 0, active: true, captured: false };
    moved.current = 0;
  };
  const onPointerMove = (e) => {
    if (!gesture.current.active) return;
    const raw = e.clientX - gesture.current.x;
    moved.current = raw;
    if (!gesture.current.captured) {
      if (Math.abs(raw) <= 8) return;
      gesture.current.captured = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    let dx = raw;
    if ((page === 0 && dx > 0) || (page === PAGES.length - 1 && dx < 0)) dx *= 0.35;
    gesture.current.dx = dx;
    setDrag(dx);
  };
  const endDrag = (e) => {
    if (!gesture.current.active) return;
    const dx = gesture.current.dx;
    const width = e.currentTarget.clientWidth || 1;
    const travel = moved.current;
    gesture.current.active = false;
    setDragging(false);
    setDrag(0);
    requestAnimationFrame(() => {
      moved.current = 0;
    });
    if (Math.abs(travel) <= 8) return;
    if (dx < -width * 0.16) go(page + 1);
    else if (dx > width * 0.16) go(page - 1);
  };

  return (
    <div className="phone" aria-label="A phone home screen of Abraham's apps. Swipe sideways for more.">
      <Mark d={ANDROID} label="Android" className="phone__plat phone__plat--android" />
      <Mark d={APPLE} label="iOS" className="phone__plat phone__plat--ios" />

      <div className="phone__frame">
        <div className="phone__notch" aria-hidden="true" />

        <div className="phone__screen">
          <div className="phone__statusbar">
            <span className="phone__time">{addis.time}</span>
            <span className="phone__glyphs" aria-hidden="true">
              <i className="phone__signal" />
              <Wifi size={11} strokeWidth={2.4} />
              <i className="phone__battery" />
            </span>
          </div>

          <div className="phone__widget">
            <div>
              <p className="phone__clock">{addis.time}</p>
              <p className="phone__place">Addis Ababa</p>
            </div>
            <div className="phone__when">
              <p>{weekday}</p>
              <p>{addis.ethiopian}</p>
            </div>
          </div>

          <div
            className={`phone__pager${dragging ? ' is-dragging' : ''}`}
            style={{ '--page': page, '--drag': drag }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div className="phone__track">
              {PAGES.map((apps, pi) => (
                <ul className="phone__apps" key={pi}>
                  {apps.map((app) => (
                    <li key={app.title}>
                      <AppIcon app={app} labeled moved={moved} />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>

          <div className="phone__home">
            {PAGES.length > 1 && (
              <div className="phone__dots" role="tablist" aria-label="Home screen pages">
                {PAGES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={i === page ? 'is-on' : undefined}
                    aria-label={`Page ${i + 1}`}
                    aria-selected={i === page}
                    onClick={() => go(i)}
                  />
                ))}
              </div>
            )}
            <div className="phone__search" aria-hidden="true">
              <Search size={13} strokeWidth={2} />
              <span>Search</span>
            </div>
            <div className="phone__bar" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}
