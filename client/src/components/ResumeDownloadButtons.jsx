import React from 'react';
import { FileDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { settingsAPI } from '../services/api';

const RESUME_OPTIONS = [
  {
    key: 'frontend',
    label: 'Frontend Resume',
    iconClass: 'text-accent-sky',
    heroClass:
      'bg-gradient-to-r from-sky-500/20 via-blue-500/15 to-cyan-500/20 hover:from-sky-500/30 hover:to-cyan-500/30 text-white border border-accent-sky/50 hover:border-accent-sky shadow-glow-cyan',
    aboutClass:
      'bg-gradient-to-r from-accent-blue to-accent-cyan text-white border border-accent-sky/40 shadow-glow-cyan hover:opacity-95',
  },
  {
    key: 'fullstack',
    label: 'Full Stack Resume',
    iconClass: 'text-accent-purple',
    heroClass:
      'bg-gradient-to-r from-violet-500/20 via-purple-500/15 to-indigo-500/20 hover:from-violet-500/30 hover:to-indigo-500/30 text-white border border-accent-violet/50 hover:border-accent-purple shadow-glow-violet',
    aboutClass:
      'bg-gradient-to-r from-accent-violet to-accent-purple text-white border border-accent-violet/40 shadow-glow-violet hover:opacity-95',
  },
];

/**
 * Renders either the uploaded Frontend / Full Stack resume download buttons
 * or falls back to the static default resume button when none are uploaded.
 */
export const ResumeDownloadButtons = ({ resumes, variant = 'hero' }) => {
  const isHero = variant === 'hero';
  const availableOptions = RESUME_OPTIONS.filter((opt) => Boolean(resumes?.[opt.key]?.url));

  const baseClass = isHero
    ? 'px-5 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shadow-sm'
    : 'px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium flex items-center gap-2 transition-all';

  if (availableOptions.length > 0) {
    return (
      <>
        {availableOptions.map((opt) => (
          <a
            key={opt.key}
            href={settingsAPI.getResumeDownloadUrl(opt.key)}
            download
            id={`${variant}-btn-resume-${opt.key}`}
            className={`${baseClass} ${isHero ? opt.heroClass : opt.aboutClass}`}
          >
            <FileDown className={`w-4 h-4 ${isHero ? opt.iconClass : 'text-white'}`} />
            <span className="font-semibold tracking-wide">{opt.label}</span>
          </a>
        ))}
      </>
    );
  }

  return (
    <a
      href={personalInfo.resumePath}
      download={personalInfo.resumeDownloadName}
      id={isHero ? 'hero-btn-resume' : 'about-download-resume'}
      className={`${baseClass} ${
        isHero
          ? 'glass-card hover:bg-white/10 text-white border border-white/10 hover:border-accent-sky/40'
          : 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-glow-blue hover:opacity-95'
      }`}
    >
      <FileDown className={`w-4 h-4 ${isHero ? 'text-accent-sky' : ''}`} />
      <span>{isHero ? 'Download Resume' : 'Download Resume (PDF)'}</span>
    </a>
  );
};

export default ResumeDownloadButtons;
