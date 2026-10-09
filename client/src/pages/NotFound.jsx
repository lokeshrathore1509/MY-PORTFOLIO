import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, AlertTriangle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 relative overflow-hidden text-center">
      <div className="absolute w-96 h-96 bg-accent-blue/15 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 max-w-lg w-full relative z-10 space-y-6"
      >
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div>
          <span className="font-mono text-xs text-accent-sky uppercase tracking-widest font-semibold">
            Error 404
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold text-white mt-1">
            Page Not Found
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-3 leading-relaxed">
            The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue via-indigo-600 to-accent-violet hover:from-accent-sky hover:to-accent-purple text-white text-xs sm:text-sm font-medium flex items-center gap-2 shadow-glow-blue transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
