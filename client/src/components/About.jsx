import React from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Sparkles,
  Layout,
  Server,
  CheckCircle,
  BrainCircuit,
  Compass,
  Code
} from 'lucide-react';
import ResumeDownloadButtons from './ResumeDownloadButtons';

export const About = ({ settings }) => {
  const highlightCards = [
    {
      icon: <GraduationCap className="w-5 h-5 text-accent-sky" />,
      title: "Academic Background",
      subtitle: "B.Tech in AI & Data Science",
      description: "IIMT College of Engineering, Greater Noida. Graduation in May 2026 with strong analytical and algorithmic foundations.",
      badge: "Class of 2026"
    },
    {
      icon: <Layout className="w-5 h-5 text-accent-violet" />,
      title: "Frontend Engineering",
      subtitle: "React.js & Modern UI/UX",
      description: "Building responsive, component-driven interfaces with pixel precision, state management, and modern CSS frameworks like Tailwind.",
      badge: "Core Specialization"
    },
    {
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      title: "Full-Stack Development",
      subtitle: "Node.js, Express & MongoDB",
      description: "Developing robust REST APIs, MVC application architectures, secure session auth, and scalable database schemas.",
      badge: "Full-Stack Systems"
    },
    {
      icon: <BrainCircuit className="w-5 h-5 text-cyan-400" />,
      title: "AI & Analytical Thinking",
      subtitle: "Data-Driven Problem Solving",
      description: "Applying data science paradigms to web software—structuring optimized schemas, data visualizations, and intuitive flows.",
      badge: "AI & Data Science"
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative overflow-hidden">
      {/* Glow aura */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-accent-violet/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-sky text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DISCOVER MY JOURNEY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            About <span className="text-gradient-primary">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan mx-auto rounded-full" />
        </div>

        {/* Profile Card & Bio Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          
          {/* Avatar and Info Card */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative group">
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-accent-blue via-accent-violet to-accent-cyan rounded-3xl blur-md opacity-50 group-hover:opacity-80 transition duration-500" />
              
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden glass-card border border-white/20 p-2">
                <img
                  src="/profile.jpg"
                  alt="Lokesh Kumar Rathore"
                  className="w-full h-full object-cover rounded-xl grayscale-[15%] group-hover:grayscale-0 transition duration-500 scale-100 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to stylized SVG avatar if image fails
                    e.target.src = "https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=600&auto=format&fit=crop&q=80";
                  }}
                />
              </div>

              {/* Verified Badge */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-dark-900 border border-accent-sky/30 shadow-lg flex items-center gap-1.5 text-xs font-medium text-slate-200">
                <CheckCircle className="w-3.5 h-3.5 text-accent-sky" />
                <span>Verified Candidate</span>
              </div>
            </div>

            <div className="text-center mt-6">
              <h3 className="text-xl font-display font-bold text-white">Lokesh Kumar Rathore</h3>
              <p className="text-sm font-mono text-accent-sky">B.Tech in AI & Data Science</p>
              <p className="text-xs text-slate-400 mt-1">IIMT College of Engineering, Greater Noida</p>
            </div>
          </div>

          {/* Professional Narrative */}
          <div className="lg:col-span-8 flex flex-col gap-5 text-slate-300">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-4">
              <h4 className="text-xl font-display font-semibold text-white flex items-center gap-2">
                <Code className="w-5 h-5 text-accent-sky" />
                Crafting Scalable, Human-Centric Software
              </h4>
              
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                I am a dedicated frontend and full-stack developer currently completing my B.Tech degree in{' '}
                <span className="text-white font-medium">Artificial Intelligence and Data Science</span> at{' '}
                <span className="text-white font-medium">IIMT College of Engineering, Greater Noida</span> (graduating in May 2026).
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                My passion lies at the intersection of aesthetic frontend design and solid software architecture. I specialize in the modern{' '}
                <span className="text-accent-sky font-medium">React.js ecosystem</span> and the{' '}
                <span className="text-accent-violet font-medium">MERN stack</span> (MongoDB, Express, React, Node.js). I have completed hands-on internships with{' '}
                <span className="text-white font-medium">Edunet Foundation (AICTE Collaboration)</span> and{' '}
                <span className="text-white font-medium">CodSoft</span>, where I built responsive web interfaces, engineered component systems, and collaborated with version control workflows.
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-slate-400">
                Rather than relying on inflated claims, I let my code, active repositories, and real project implementations speak for themselves. Every application I engineer is designed with clean structure, accessibility, performance, and maintainability in mind.
              </p>

              {/* Action buttons inside About */}
              <div className="pt-4 flex flex-wrap items-center gap-4 border-t border-white/5">
                <ResumeDownloadButtons resumes={settings?.resumes} variant="about" />

                <a
                  href="#contact"
                  className="px-5 py-2.5 rounded-xl glass-card hover:bg-white/10 text-slate-200 text-xs sm:text-sm font-medium transition-colors"
                >
                  Get In Touch
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Animated Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {highlightCards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card glass-card-hover p-6 rounded-2xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10">
                    {card.badge}
                  </span>
                </div>
                <h4 className="text-base font-display font-semibold text-white mb-1">
                  {card.title}
                </h4>
                <p className="text-xs font-mono text-accent-sky mb-2">
                  {card.subtitle}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default About;
