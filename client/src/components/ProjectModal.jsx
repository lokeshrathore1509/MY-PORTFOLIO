import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  CheckCircle2,
  Calendar,
  User,
  Sparkles,
  Layers,
  AlertCircle
} from 'lucide-react';
import { Github } from './Icons';

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Prevent background scrolling
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!project) return null;

  const details = project.details || {};
  const features = Array.isArray(details.features)
    ? details.features
    : typeof details.features === 'string'
    ? details.features.split(/(?<=[.!?])\s+/)
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl glass-card rounded-2xl border border-white/20 shadow-2xl bg-dark-900/95 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-dark-900/90">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-accent-blue/15 text-accent-sky border border-accent-blue/30">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Featured
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            
            {/* Project Image Banner */}
            <div className="relative rounded-xl overflow-hidden border border-white/10 aspect-video bg-dark-950">
              <img
                src={project.image || '/project-finance.png'}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/project-finance.png';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
            </div>

            {/* Title & Short Description */}
            <div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            {/* Role & Timeline info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y border-white/10 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <User className="w-4 h-4 text-accent-sky" />
                <span className="text-slate-400">Role:</span>
                <span className="font-medium text-white">{details.role || 'Developer'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Calendar className="w-4 h-4 text-accent-violet" />
                <span className="text-slate-400">Timeline:</span>
                <span className="font-medium text-white">{details.timeline || '2025 – 2026'}</span>
              </div>
            </div>

            {/* Technologies Badges */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-dark-800 text-xs font-medium text-accent-sky border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Problem & Solution */}
            {(details.problem || details.solution) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.problem && (
                  <div className="p-4 rounded-xl bg-dark-800/60 border border-white/5">
                    <h5 className="text-xs font-mono text-rose-400 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" /> The Problem
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {details.problem}
                    </p>
                  </div>
                )}

                {details.solution && (
                  <div className="p-4 rounded-xl bg-dark-800/60 border border-white/5">
                    <h5 className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> The Solution
                    </h5>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {details.solution}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Key Features List */}
            {features.length > 0 && (
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-accent-sky" /> Key Engineering Features
                </h4>
                <div className="space-y-2">
                  {features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer Bar with Real Action Links */}
          <div className="px-6 py-4 border-t border-white/10 bg-dark-900/90 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet hover:from-accent-sky hover:to-accent-purple text-white text-xs sm:text-sm font-medium flex items-center gap-2 shadow-glow-blue transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 rounded-xl bg-dark-800 text-slate-500 text-xs sm:text-sm font-medium flex items-center gap-2 cursor-not-allowed border border-white/5"
                  title="Demo not currently deployed"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Demo Unavailable</span>
                </button>
              )}

              {project.githubUrl ? (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl glass-card hover:bg-white/10 text-slate-200 hover:text-white text-xs sm:text-sm font-medium flex items-center gap-2 border border-white/10 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Source Code</span>
                </a>
              ) : (
                <button
                  disabled
                  className="px-4 py-2 rounded-xl bg-dark-800 text-slate-500 text-xs sm:text-sm font-medium flex items-center gap-2 cursor-not-allowed border border-white/5"
                  title="Repository is private"
                >
                  <Github className="w-4 h-4" />
                  <span>Private Repo</span>
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Close
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
