import { ArrowUp, Mail, Heart, Sparkles } from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-dark-950/80 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between pb-12 border-b border-white/5">
          
          {/* Brand & Brief */}
          <div className="md:col-span-6 flex flex-col items-start">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-blue via-accent-violet to-accent-cyan p-[1px]">
                <div className="w-full h-full bg-dark-900 rounded-[11px] flex items-center justify-center">
                  <span className="font-display font-bold text-sm text-white">LK</span>
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white">
                {personalInfo.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              B.Tech in Artificial Intelligence & Data Science graduate specializing in modern React frontend experiences and full-stack web applications.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 flex flex-col gap-2 text-xs sm:text-sm">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-1">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2 text-slate-400">
              <a href="#home" className="hover:text-white transition-colors">Home</a>
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>

          {/* Socials & Back to Top */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Connect
            </span>
            <div className="flex items-center gap-2">
              <a
                href={personalInfo.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-dark-800 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>

              <a
                href={personalInfo.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-dark-800 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="p-2.5 rounded-xl bg-dark-800 hover:bg-white/10 text-slate-300 hover:text-white border border-white/5 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>

              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-xl bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-sky hover:text-white border border-accent-blue/30 transition-all flex items-center justify-center ml-2"
                title="Back to Top"
                aria-label="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono gap-3">
          <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Built with React, Vite & Tailwind CSS</span>
            <span>•</span>
            <a href="/admin/login" className="text-slate-400 hover:text-accent-sky transition-colors">
              Admin Portal
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
