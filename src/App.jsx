import { useEffect } from 'react';
import Preloader from './components/Preloader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Services from './components/Services';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Chat from './components/Chat';
import { startSmooth, stopSmooth, ScrollTrigger } from './lib/motion';

export default function App() {
  useEffect(() => {
    startSmooth();
    // Sticky and scroll-linked pieces measure the page; measure again
    // once the real fonts are in and again after images settle.
    document.fonts.ready.then(() => ScrollTrigger.refresh());
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    return () => {
      window.removeEventListener('load', onLoad);
      stopSmooth();
    };
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Preloader />
      <Cursor />
      <Navbar />
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Services />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Chat />
    </>
  );
}
