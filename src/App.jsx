import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import FreelanceCallout from './components/FreelanceCallout';
import Contact from './components/Contact';

export default function App() {
  const [theme, setTheme] = useState(() => {
    // For deployed site, check localStorage; fall back to light
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        return saved;
      }
    }
    return 'light';
  });

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('portfolio-theme', next);
  };

  return (
    <div className="grain-overlay">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Certifications />
        <FreelanceCallout />
        <Contact />
      </main>
    </div>
  );
}
