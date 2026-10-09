import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Sparkles,
  Award,
  ChevronRight
} from 'lucide-react';
import { experienceData, educationData } from '../data/portfolioData';

export const ExperienceEducation = () => {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="experience" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-sky/10 border border-accent-sky/20 text-accent-sky text-xs font-mono mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Experience & <span className="text-gradient-primary">Education</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Professional industry internships and solid academic foundations in Computer Science, AI, and Data Science.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan mx-auto rounded-full mt-4" />
        </div>

        {/* Tab Toggle */}
        <div className="flex justify-center mb-14">
          <div className="p-1 rounded-2xl bg-dark-800/80 border border-white/10 flex items-center backdrop-blur-md">
            <button
              onClick={() => setActiveTab('experience')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'experience'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Internship Experience</span>
            </button>

            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'education'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Formal Education</span>
            </button>
          </div>
        </div>

        {/* Content Timelines */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'experience' ? (
            <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-12">
              {experienceData.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Timeline Node Indicator */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-dark-900 border-2 border-accent-blue flex items-center justify-center shadow-glow-blue group-hover:scale-125 transition-transform">
                    <div className="w-2 h-2 rounded-full bg-accent-sky" />
                  </div>

                  {/* Experience Card */}
                  <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-accent-sky font-semibold">
                          {exp.type}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                          {exp.role}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-slate-300">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 self-start sm:self-auto">
                        <Calendar className="w-3.5 h-3.5 text-accent-sky" />
                        <span>{exp.duration}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
                      {exp.description}
                    </p>

                    {/* Highlights List */}
                    <div className="space-y-2 mb-6">
                      {exp.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technologies Tag Pills */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                      {exp.technologies.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-lg bg-dark-800 text-[11px] font-mono text-slate-300 border border-white/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="relative border-l border-white/10 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-12">
              {educationData.map((edu, idx) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="relative group"
                >
                  {/* Node */}
                  <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-dark-900 border-2 border-accent-violet flex items-center justify-center shadow-glow-violet group-hover:scale-125 transition-transform">
                    <div className="w-2 h-2 rounded-full bg-accent-purple" />
                  </div>

                  {/* Card */}
                  <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-wider text-accent-purple font-semibold">
                          Undergraduate Degree
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-bold text-white mt-0.5">
                          {edu.degree}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-slate-300">
                          {edu.institution}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 self-start sm:self-auto">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{edu.status}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{edu.location} ({edu.duration})</span>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2.5 pt-2">
                      {edu.details.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-accent-sky flex-shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default ExperienceEducation;
