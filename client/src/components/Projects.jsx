import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Sparkles,
  Layers,
  Eye,
  Filter,
  ArrowUpRight,
  Code
} from 'lucide-react';
import { Github } from './Icons';
import { initialProjectsData } from '../data/portfolioData';
import { projectsAPI } from '../services/api';
import ProjectModal from './ProjectModal';

export const Projects = () => {
  const [projects, setProjects] = useState(initialProjectsData);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch live projects from backend
  useEffect(() => {
    let isMounted = true;
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const res = await projectsAPI.getAll(false);
        if (isMounted && res.success && res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      } catch (err) {
        console.warn('Backend projects endpoint not reachable, displaying local fallback data.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchProjects();
    return () => {
      isMounted = false;
    };
  }, []);

  const categories = ['All', 'Full Stack', 'Frontend', 'React'];

  const filteredProjects =
    selectedFilter === 'All'
      ? projects
      : projects.filter((p) => {
          if (selectedFilter === 'Full Stack') return p.category === 'Full Stack';
          if (selectedFilter === 'Frontend') return p.category === 'Frontend';
          if (selectedFilter === 'React') return p.category === 'React';
          return true;
        });

  return (
    <section id="projects" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20 text-accent-sky text-xs font-mono mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>CURATED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Featured <span className="text-gradient-primary">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Real, functional applications built with scalable code architectures, responsive interfaces, and production-tested patterns.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan mx-auto rounded-full mt-4" />
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                selectedFilter === cat
                  ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-glow-blue scale-105'
                  : 'glass-card text-slate-400 hover:text-white hover:bg-white/5 border border-white/5'
              }`}
            >
              {cat === 'All' ? 'All Projects' : cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project._id || project.slug || idx}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-accent-sky/40 transition-all duration-300 flex flex-col justify-between hover:shadow-glow-blue hover:-translate-y-1.5"
              >
                {/* Thumbnail Preview with hover zoom & dark gradient */}
                <div className="relative aspect-[16/10] overflow-hidden bg-dark-950">
                  <img
                    src={project.image || '/project-finance.png'}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    onError={(e) => {
                      e.target.src = '/project-finance.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-dark-950/80 backdrop-blur-md text-accent-sky border border-white/10">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold bg-amber-500/20 backdrop-blur-md text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow-sm">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Quick Action Overlay on Desktop */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-dark-950/60 backdrop-blur-[2px]">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-4 py-2 rounded-xl bg-white text-dark-950 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-200 transition-colors shadow-lg"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-display font-bold text-white mb-2 group-hover:text-accent-sky transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Technology Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies?.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-0.5 rounded-md bg-dark-800/80 text-[11px] font-medium text-slate-300 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies?.length > 5 && (
                        <span className="px-2 py-0.5 rounded-md bg-dark-800/50 text-[10px] font-mono text-slate-500">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Links */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2 text-xs">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-accent-sky hover:text-white font-medium flex items-center gap-1 transition-colors py-1"
                    >
                      <span>Explore</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {project.githubUrl ? (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-dark-800 hover:bg-white/10 text-slate-300 hover:text-white transition-colors border border-white/5"
                          title="View Source Code"
                          aria-label={`GitHub for ${project.title}`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      ) : null}

                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-accent-blue/10 hover:bg-accent-blue/20 text-accent-sky hover:text-white transition-colors border border-accent-blue/20"
                          title="Open Live Application"
                          aria-label={`Live Demo for ${project.title}`}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Details Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}

      </div>
    </section>
  );
};

export default Projects;
