import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code,
  Server,
  Database,
  Wrench,
  Sparkles,
  Layers,
  Cpu,
  Globe,
  Terminal,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';

// Helper to provide nice icons for skills
const getSkillIcon = (iconName) => {
  switch (iconName) {
    case 'react':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg';
    case 'javascript':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg';
    case 'html5':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg';
    case 'css3':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg';
    case 'tailwindcss':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg';
    case 'bootstrap':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg';
    case 'redux':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg';
    case 'nodejs':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg';
    case 'express':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg';
    case 'mongodb':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg';
    case 'mysql':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg';
    case 'git':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg';
    case 'github':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg';
    case 'vscode':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg';
    case 'postman':
      return 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg';
    default:
      return null;
  }
};

const getCategoryIcon = (category) => {
  switch (category) {
    case 'Frontend':
      return <Code className="w-5 h-5 text-accent-sky" />;
    case 'Backend':
      return <Server className="w-5 h-5 text-accent-violet" />;
    case 'Database':
      return <Database className="w-5 h-5 text-emerald-400" />;
    case 'Tools':
      return <Wrench className="w-5 h-5 text-amber-400" />;
    default:
      return <Layers className="w-5 h-5 text-accent-blue" />;
  }
};

export const Skills = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools'];

  const filteredCategories =
    selectedCategory === 'All'
      ? skillsData
      : skillsData.filter((cat) => cat.category === selectedCategory);

  return (
    <section id="skills" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-violet/20 text-accent-purple text-xs font-mono mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL CAPABILITIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Skills & <span className="text-gradient-primary">Expertise</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Organized into dedicated domains. Transparent, honest proficiencies without arbitrary percentage bars.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan mx-auto rounded-full mt-4" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-glow-blue scale-105'
                  : 'glass-card text-slate-400 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              {cat !== 'All' && getCategoryIcon(cat)}
              <span>{cat === 'All' ? 'All Domains' : cat}</span>
            </button>
          ))}
        </div>

        {/* Skills Category Blocks */}
        <div className="flex flex-col gap-12">
          <AnimatePresence>
            {filteredCategories.map((group, groupIdx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
                className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10"
              >
                {/* Category Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-6 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shadow-inner">
                      {getCategoryIcon(group.category)}
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-bold text-white">
                        {group.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10 self-start sm:self-auto">
                    {group.skills.length} Technologies
                  </span>
                </div>

                {/* Skill Chips Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
                  {group.skills.map((skill) => {
                    const iconUrl = getSkillIcon(skill.icon);
                    return (
                      <div
                        key={skill.name}
                        className="group p-3.5 rounded-xl bg-dark-800/80 hover:bg-dark-750 border border-white/5 hover:border-accent-sky/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-2.5 mb-2">
                          {iconUrl ? (
                            <img
                              src={iconUrl}
                              alt={skill.name}
                              className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-md bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent-sky" />
                            </div>
                          )}
                          <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors truncate">
                            {skill.name}
                          </span>
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                          <span className="text-accent-sky/80 text-[10px] uppercase tracking-wider">
                            {skill.tag}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 group-hover:bg-emerald-400 animate-pulse" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;
