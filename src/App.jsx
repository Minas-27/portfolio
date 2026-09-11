import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Services from './components/Services';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import FreelanceCallout from './components/FreelanceCallout';
import Contact from './components/Contact';
import Chat from './components/Chat';
import ScrollProgress from './components/ScrollProgress';
import ScrollTop from './components/ScrollTop';

export default function App() {
  const [theme, setTheme] = useState(() => {
    // For deployed site, check localStorage; fall back to light
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      const theme = saved || 'dark';
      document.documentElement.setAttribute('data-theme', theme);
      return theme;
    }
    return 'dark';
  });

  // Framer Motion renders every section at opacity:0 until it animates in.
  // If that never happens (JS error, a crawler that renders, an engine that
  // skips IntersectionObserver) the page is blank while the content sits in
  // the DOM. Reveal everything after a short grace period, always.
  /* One delegated listener drives the hero's cursor-tracked glow. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      const el = e.target.closest?.('.hero');
      if (!el) return;
      const r = el.getBoundingClientRect();
      const target = el.querySelector('.hero__bg-glow');
      if (!target) return;
      target.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
      target.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const t = setTimeout(
      () => document.documentElement.classList.add('reveal-all'),
      2500,
    );
    return () => clearTimeout(t);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  };

  return (
    <div className="grain-overlay">
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Services />
        <Experience />
        <Projects />
        <Certifications />
        <FreelanceCallout />
        <Contact />
      </main>
      <Chat />
      <ScrollTop />
    </div>
  );
}
