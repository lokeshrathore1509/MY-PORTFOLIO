import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileDown,
  ArrowRight,
  Sparkles,
  Terminal,
  Code2,
  CheckCircle2,
  Mail,
  ExternalLink,
  Layers,
  Cpu
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';
import { settingsAPI } from '../services/api';

export const Hero = () => {
  const [settings, setSettings] = useState(personalInfo);
  const [activeTab, setActiveTab] = useState('code');

  useEffect(() => {
    // Attempt to load dynamic settings from backend
    settingsAPI.get()
      .then((res) => {
        if (res.success && res.data) {
          setSettings((prev) => ({ ...prev, ...res.data }));
        }
      })
      .catch(() => {
        // Fallback gracefully to default personalInfo
      });
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center overflow-hidden"
    >
      {/* Background Animated Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-accent-blue/15 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 md:w-96 md:h-96 bg-accent-violet/15 rounded-full blur-[110px] animate-blob [animation-delay:2s]" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 md:w-80 md:h-80 bg-accent-cyan/10 rounded-full blur-[90px] animate-blob [animation-delay:4s]" />
        
        {/* Subtle geometric dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Availability Indicator Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6 backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{settings.availabilityText || 'Available for new opportunities'}</span>
            </motion.div>

            {/* Candidate Name Intro */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="flex items-center gap-3 mb-3"
            >
              <span className="text-sm font-mono uppercase tracking-widest text-accent-sky font-semibold">
                Hello, I am
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-r from-accent-sky to-transparent" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.1] mb-4"
            >
              Lokesh Kumar <span className="text-gradient-primary">Rathore</span>
            </motion.h1>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold text-slate-200 mb-3"
            >
              {settings.headline || 'Building Modern Web Experiences That Make an Impact.'}
            </motion.h2>

            {/* Supporting Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-base sm:text-lg font-mono text-accent-sky/90 mb-4"
            >
              {settings.supportingText || 'Frontend Developer | React.js | Full-Stack Web Development'}
            </motion.p>

            {/* Short Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-xl mb-8"
            >
              {settings.shortBio ||
                'I build responsive, interactive, and user-focused web applications using modern frontend technologies and full-stack tools.'}
            </motion.p>

            {/* Action Buttons: View Projects, Download Resume, Contact Me */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto"
            >
              {/* View My Projects */}
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue via-indigo-600 to-accent-violet hover:from-accent-sky hover:to-accent-purple text-white font-medium text-sm flex items-center justify-center gap-2 shadow-glow-blue transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto"
                id="hero-btn-projects"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              {/* Download Resume */}
              <a
                href="/assets/Lokesh_Kumar_Rathore_Resume.pdf"
                download="Lokesh_Kumar_Rathore_Resume.pdf"
                className="px-6 py-3 rounded-xl glass-card hover:bg-white/10 text-white font-medium text-sm flex items-center justify-center gap-2 border border-white/10 hover:border-accent-sky/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shadow-sm"
                id="hero-btn-resume"
              >
                <FileDown className="w-4 h-4 text-accent-sky" />
                <span>Download Resume</span>
              </a>

              {/* Contact Me */}
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 font-medium text-sm flex items-center justify-center gap-2 border border-transparent hover:border-white/10 transition-all w-full sm:w-auto"
                id="hero-btn-contact"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Social Proof & Quick Tech Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-10 pt-6 border-t border-white/5 flex flex-wrap items-center gap-4 text-xs text-slate-400"
            >
              <span className="font-mono text-slate-500 uppercase tracking-wider text-[11px]">Connect:</span>
              <a
                href={settings.githubUrl || personalInfo.socialLinks.github || "https://github.com/lokeshrathore1509"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark-800/80 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5 flex items-center gap-1.5"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={settings.linkedinUrl || personalInfo.socialLinks.linkedin || "https://www.linkedin.com/in/lokesh-rathore-220lr4644"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-dark-800/80 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5 flex items-center gap-1.5"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:inline font-mono">
                B.Tech AI & Data Science (2022–2026)
              </span>
            </motion.div>

          </div>

          {/* Right Column: Animated Developer Visual (Floating Code Editor / Terminal) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative mx-auto max-w-lg lg:max-w-none"
            >
              {/* Outer Decorative Glow Ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-1000 animate-pulse-slow"></div>

              {/* Code Terminal Window Card */}
              <div className="relative glass-card rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-dark-950/90 backdrop-blur-xl">
                
                {/* Window Titlebar */}
                <div className="px-4 py-3 bg-dark-900/80 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                    <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1">
                      <Terminal className="w-3.5 h-3.5 text-accent-sky" />
                      developer.config.jsx
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    compiled
                  </div>
                </div>

                {/* Editor Content Area */}
                <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-slate-300 overflow-x-auto">
                  <div className="flex flex-col gap-1.5">
                    <p className="text-slate-500">// Welcome to my developer portfolio</p>
                    <p>
                      <span className="text-purple-400">const</span>{' '}
                      <span className="text-blue-400">developer</span> = {'{'}
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-400">name:</span>{' '}
                      <span className="text-emerald-300">"Lokesh Kumar Rathore"</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-400">education:</span>{' '}
                      <span className="text-emerald-300">"B.Tech in AI & Data Science"</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-400">college:</span>{' '}
                      <span className="text-emerald-300">"IIMT College of Engineering"</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-400">graduation:</span>{' '}
                      <span className="text-cyan-300">"May 2026"</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-400">coreStack:</span> [
                    </p>
                    <p className="pl-8 text-amber-300">
                      "React.js", "JavaScript (ES6+)", "Node.js", "Express", "MongoDB", "Tailwind CSS"
                    </p>
                    <p className="pl-4">],</p>
                    <p className="pl-4">
                      <span className="text-slate-400">featuredProjects:</span> [
                    </p>
                    <p className="pl-8 text-sky-300">
                      "Wanderlust (Full-Stack)", "NovaFood (React)", "Recipe Finder"
                    </p>
                    <p className="pl-4">],</p>
                    <p className="pl-4">
                      <span className="text-slate-400">openToOpportunities:</span>{' '}
                      <span className="text-accent-sky font-semibold">true</span>,
                    </p>
                    <p className="pl-4">
                      <span className="text-slate-400">passion:</span>{' '}
                      <span className="text-emerald-300">"Building fast, human-centric web apps"</span>
                    </p>
                    <p>{'};'}</p>
                    
                    <div className="pt-2 flex items-center gap-2 text-slate-500">
                      <span className="text-accent-violet">❯</span>
                      <span className="text-slate-300">portfolio.renderExperience()</span>
                      <span className="inline-block w-2 h-4 bg-accent-sky animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Footer Status Bar */}
                <div className="px-4 py-2 bg-dark-900/90 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="text-accent-sky flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5" /> UTF-8
                    </span>
                    <span>JavaScript React</span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 100% Production Ready
                  </div>
                </div>

              </div>

              {/* Floating Technology Badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-4 glass-card px-3.5 py-2 rounded-xl border border-white/10 shadow-lg flex items-center gap-2 text-xs font-semibold text-white bg-dark-800/90 backdrop-blur-md"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>React.js Specialist</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-5 -left-4 glass-card px-3.5 py-2 rounded-xl border border-white/10 shadow-lg flex items-center gap-2 text-xs font-semibold text-white bg-dark-800/90 backdrop-blur-md"
              >
                <Layers className="w-3.5 h-3.5 text-accent-violet" />
                <span>Full-Stack MERN</span>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
