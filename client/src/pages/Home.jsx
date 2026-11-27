import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import ExperienceEducation from '../components/ExperienceEducation';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import { settingsAPI } from '../services/api';

export const Home = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    settingsAPI
      .get()
      .then((res) => {
        if (res.success && res.data) {
          setSettings(res.data);
        }
      })
      .catch(() => {
        // Fallback gracefully to static defaults inside components
      });
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-900 text-slate-100 selection:bg-accent-blue/30 selection:text-accent-sky overflow-x-hidden">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero settings={settings} />
        <About settings={settings} />
        <Skills />
        <Projects />
        <ExperienceEducation />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
