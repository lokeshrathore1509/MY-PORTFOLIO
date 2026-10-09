import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Layers,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Sparkles,
  LogOut,
  Mail,
  Settings,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Upload,
  ArrowLeft,
  RefreshCw,
  X,
  FileText,
  Clock,
  ShieldAlert,
  Search
} from 'lucide-react';
import { Github } from '../components/Icons';
import { useAuth } from '../context/AuthContext';
import { projectsAPI, contactAPI, settingsAPI } from '../services/api';
import ProjectModal from '../components/ProjectModal';

export const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('projects'); // 'projects', 'messages', 'settings'
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({
    availabilityText: '',
    isAvailable: true,
    headline: '',
    supportingText: '',
    shortBio: '',
    email: '',
    githubUrl: '',
    linkedinUrl: '',
    phone: '',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState({ type: null, message: '' });

  // Modal State for Add / Edit Project
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectFormData, setProjectFormData] = useState({
    title: '',
    shortDescription: '',
    category: 'Full Stack',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    isPublished: true,
    displayOrder: 1,
    overview: '',
    problem: '',
    solution: '',
    features: '',
    role: 'Full-Stack Developer',
    timeline: '2025 - 2026',
    thumbnailFile: null,
    currentImage: '',
  });

  // Delete Confirmation Modal
  const [deleteConfirmProject, setDeleteConfirmProject] = useState(null);

  // Live Preview Modal
  const [previewProject, setPreviewProject] = useState(null);

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Initial Fetch Data
  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const [projRes, msgRes, setRes] = useState();

      const projectsData = await projectsAPI.getAll(true);
      if (projectsData.success) {
        setProjects(projectsData.data || []);
      }

      const messagesData = await contactAPI.getMessages();
      if (messagesData.success) {
        setMessages(messagesData.data || []);
      }

      const settingsData = await settingsAPI.get();
      if (settingsData.success && settingsData.data) {
        setSettings(settingsData.data);
      }
    } catch (err) {
      setFeedback({ type: 'error', message: err.message || 'Failed to fetch data' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const showNotification = (type, message) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback({ type: null, message: '' }), 4000);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  // Open Add Project Modal
  const handleOpenAddModal = () => {
    setEditingProject(null);
    setProjectFormData({
      title: '',
      shortDescription: '',
      category: 'Full Stack',
      technologies: 'React.js, Node.js, Express, MongoDB, Tailwind CSS',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      isPublished: true,
      displayOrder: projects.length + 1,
      overview: '',
      problem: '',
      solution: '',
      features: 'Full CRUD operations\nResponsive UI\nSecure authentication',
      role: 'Full-Stack Developer',
      timeline: '2025 - 2026',
      thumbnailFile: null,
      currentImage: '',
    });
    setIsProjectModalOpen(true);
  };

  // Open Edit Project Modal
  const handleOpenEditModal = (proj) => {
    setEditingProject(proj);
    setProjectFormData({
      title: proj.title || '',
      shortDescription: proj.shortDescription || '',
      category: proj.category || 'Full Stack',
      technologies: Array.isArray(proj.technologies)
        ? proj.technologies.join(', ')
        : proj.technologies || '',
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      featured: !!proj.featured,
      isPublished: proj.isPublished !== false,
      displayOrder: proj.displayOrder || 1,
      overview: proj.details?.overview || '',
      problem: proj.details?.problem || '',
      solution: proj.details?.solution || '',
      features: Array.isArray(proj.details?.features)
        ? proj.details.features.join('\n')
        : proj.details?.features || '',
      role: proj.details?.role || 'Developer',
      timeline: proj.details?.timeline || '2025 - 2026',
      thumbnailFile: null,
      currentImage: proj.image || '',
    });
    setIsProjectModalOpen(true);
  };

  // Submit Add / Edit Project Form
  const handleSaveProject = async (e) => {
    e.preventDefault();

    if (!projectFormData.title.trim() || !projectFormData.shortDescription.trim()) {
      showNotification('error', 'Title and short description are required.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', projectFormData.title.trim());
      formData.append('shortDescription', projectFormData.shortDescription.trim());
      formData.append('category', projectFormData.category);
      
      const techArray = projectFormData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      formData.append('technologies', JSON.stringify(techArray));

      formData.append('liveUrl', projectFormData.liveUrl.trim());
      formData.append('githubUrl', projectFormData.githubUrl.trim());
      formData.append('featured', projectFormData.featured);
      formData.append('isPublished', projectFormData.isPublished);
      formData.append('displayOrder', projectFormData.displayOrder);

      const featuresArray = projectFormData.features
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean);

      const detailsObj = {
        overview: projectFormData.overview,
        problem: projectFormData.problem,
        solution: projectFormData.solution,
        features: featuresArray,
        role: projectFormData.role,
        timeline: projectFormData.timeline,
      };
      formData.append('details', JSON.stringify(detailsObj));

      if (projectFormData.thumbnailFile) {
        formData.append('thumbnail', projectFormData.thumbnailFile);
      } else if (projectFormData.currentImage) {
        formData.append('imageUrl', projectFormData.currentImage);
      }

      if (editingProject) {
        const id = editingProject._id || editingProject.slug;
        const res = await projectsAPI.update(id, formData);
        showNotification('success', res.message || 'Project updated successfully.');
      } else {
        const res = await projectsAPI.create(formData);
        showNotification('success', res.message || 'Project created successfully.');
      }

      setIsProjectModalOpen(false);
      loadDashboardData();
    } catch (err) {
      showNotification('error', err.message || 'Failed to save project.');
    }
  };

  // Delete Project Action
  const handleDeleteProject = async () => {
    if (!deleteConfirmProject) return;
    try {
      const id = deleteConfirmProject._id || deleteConfirmProject.slug;
      await projectsAPI.delete(id);
      showNotification('success', 'Project deleted successfully.');
      setDeleteConfirmProject(null);
      loadDashboardData();
    } catch (err) {
      showNotification('error', err.message || 'Failed to delete project.');
    }
  };

  // Toggle Project Published Status quickly
  const handleTogglePublish = async (proj) => {
    try {
      const id = proj._id || proj.slug;
      await projectsAPI.update(id, { isPublished: !proj.isPublished });
      loadDashboardData();
      showNotification('success', `Project ${!proj.isPublished ? 'published' : 'unpublished'}.`);
    } catch (err) {
      showNotification('error', err.message || 'Failed to update publication status.');
    }
  };

  // Toggle Featured status
  const handleToggleFeatured = async (proj) => {
    try {
      const id = proj._id || proj.slug;
      await projectsAPI.update(id, { featured: !proj.featured });
      loadDashboardData();
      showNotification('success', `Project ${!proj.featured ? 'marked as featured' : 'unmarked from featured'}.`);
    } catch (err) {
      showNotification('error', err.message || 'Failed to toggle featured flag.');
    }
  };

  // Message Actions
  const handleMarkMessageRead = async (id) => {
    try {
      await contactAPI.markRead(id);
      loadDashboardData();
      showNotification('success', 'Message marked as read.');
    } catch (err) {
      showNotification('error', err.message);
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      await contactAPI.deleteMessage(id);
      loadDashboardData();
      showNotification('success', 'Message deleted.');
    } catch (err) {
      showNotification('error', err.message);
    }
  };

  // Settings Save
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      await settingsAPI.update(settings);
      showNotification('success', 'Portfolio settings updated successfully.');
    } catch (err) {
      showNotification('error', err.message || 'Failed to save settings.');
    }
  };

  // Filtered projects by search query
  const filteredProjects = projects.filter((p) =>
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.technologies?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="glass-nav border-b border-white/10 sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Public Site</span>
          </Link>
          <div className="h-4 w-[1px] bg-white/10" />
          <h1 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2">
            <span>Admin Control Panel</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Authenticated
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            {admin?.email}
          </span>
          <button
            onClick={handleLogout}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 text-xs font-medium flex items-center gap-1.5 transition-all"
            id="admin-logout-btn"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Log Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1">
        
        {/* Floating Feedback Notification */}
        {feedback.message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl text-xs sm:text-sm flex items-center gap-2 ${
              feedback.type === 'error'
                ? 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
                : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
            }`}
          >
            {feedback.type === 'error' ? (
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            )}
            <span>{feedback.message}</span>
          </motion.div>
        )}

        {/* Dashboard Tabs & Overview Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4 rounded-xl border border-white/5">
            <span className="text-slate-400 text-xs font-mono uppercase">Total Projects</span>
            <p className="text-2xl font-display font-bold text-white mt-1">{projects.length}</p>
          </div>
          <div className="glass-card p-4 rounded-xl border border-white/5">
            <span className="text-slate-400 text-xs font-mono uppercase">Published</span>
            <p className="text-2xl font-display font-bold text-emerald-400 mt-1">
              {projects.filter((p) => p.isPublished !== false).length}
            </p>
          </div>
          <div className="glass-card p-4 rounded-xl border border-white/5">
            <span className="text-slate-400 text-xs font-mono uppercase">Featured</span>
            <p className="text-2xl font-display font-bold text-amber-300 mt-1">
              {projects.filter((p) => p.featured).length}
            </p>
          </div>
          <div className="glass-card p-4 rounded-xl border border-white/5">
            <span className="text-slate-400 text-xs font-mono uppercase">Contact Messages</span>
            <p className="text-2xl font-display font-bold text-accent-sky mt-1">{messages.length}</p>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'projects'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Projects ({projects.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'messages'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Inquiries ({messages.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-glow-blue'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site Settings</span>
            </button>
          </div>

          {activeTab === 'projects' && (
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white text-xs sm:text-sm font-medium flex items-center gap-1.5 shadow-glow-blue hover:scale-105 transition-transform"
              id="admin-add-project-btn"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          )}
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Search and Refresh Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-sky/50"
                />
              </div>

              <button
                onClick={loadDashboardData}
                className="px-3.5 py-2 rounded-xl glass-card text-slate-400 hover:text-white text-xs flex items-center gap-1.5 self-end sm:self-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Refresh Data</span>
              </button>
            </div>

            {/* Projects Table / Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((proj) => (
                <div
                  key={proj._id || proj.slug}
                  className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between"
                >
                  <div className="relative aspect-video bg-dark-950 overflow-hidden">
                    <img
                      src={proj.image || '/project-finance.png'}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = '/project-finance.png';
                      }}
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-dark-950/80 text-accent-sky border border-white/10">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                          proj.isPublished !== false
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-700/50 text-slate-400 border border-slate-600'
                        }`}
                      >
                        {proj.isPublished !== false ? 'Published' : 'Draft'}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-display font-bold text-white mb-1.5">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {proj.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {proj.technologies?.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded bg-dark-800 text-[10px] text-slate-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setPreviewProject(proj)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                          title="Preview Project"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleTogglePublish(proj)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
                          title={proj.isPublished !== false ? 'Unpublish' : 'Publish'}
                        >
                          {proj.isPublished !== false ? (
                            <EyeOff className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-slate-500" />
                          )}
                        </button>

                        <button
                          onClick={() => handleToggleFeatured(proj)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-amber-300 hover:bg-white/5"
                          title={proj.featured ? 'Remove from Featured' : 'Mark as Featured'}
                        >
                          <Sparkles className={`w-4 h-4 ${proj.featured ? 'text-amber-400' : 'text-slate-500'}`} />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(proj)}
                          className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-medium flex items-center gap-1"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteConfirmProject(proj)}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES & MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-4">
            <h3 className="text-lg font-display font-bold text-white mb-2">
              Visitor Contact Submissions
            </h3>
            {messages.length === 0 ? (
              <div className="glass-card p-12 rounded-2xl text-center text-slate-400">
                <Mail className="w-10 h-10 mx-auto text-slate-600 mb-3" />
                <p className="text-sm">No contact messages received yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`glass-card p-5 rounded-2xl border transition-all ${
                      msg.read ? 'border-white/5 opacity-80' : 'border-accent-sky/30 shadow-glow-blue'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-bold text-white text-base">
                            {msg.name}
                          </h4>
                          {!msg.read && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-accent-sky/20 text-accent-sky border border-accent-sky/30">
                              NEW
                            </span>
                          )}
                        </div>
                        <a
                          href={`mailto:${msg.email}`}
                          className="text-xs font-mono text-accent-sky hover:underline"
                        >
                          {msg.email}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-slate-400">
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                        {!msg.read && (
                          <button
                            onClick={() => handleMarkMessageRead(msg._id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs hover:bg-emerald-500/20"
                          >
                            Mark Read
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteMessage(msg._id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-dark-950/60 p-3.5 rounded-xl border border-white/5">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Portfolio Information Settings
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Update dynamic content displayed on the homepage without code modification.
              </p>

              <form onSubmit={handleSaveSettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Availability Status Text
                  </label>
                  <input
                    type="text"
                    value={settings.availabilityText}
                    onChange={(e) => setSettings({ ...settings, availabilityText: e.target.value })}
                    placeholder="Available for opportunities"
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-accent-sky/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Hero Headline
                  </label>
                  <input
                    type="text"
                    value={settings.headline}
                    onChange={(e) => setSettings({ ...settings, headline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-accent-sky/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                    Supporting Roles Subhead
                  </label>
                  <input
                    type="text"
                    value={settings.supportingText}
                    onChange={(e) => setSettings({ ...settings, supportingText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-accent-sky/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={settings.githubUrl}
                      onChange={(e) => setSettings({ ...settings, githubUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-accent-sky/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1.5">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={settings.linkedinUrl}
                      onChange={(e) => setSettings({ ...settings, linkedinUrl: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-white/10 text-white text-xs sm:text-sm focus:outline-none focus:border-accent-sky/50"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="mt-4 px-6 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white text-xs sm:text-sm font-medium shadow-glow-blue hover:opacity-90"
                >
                  Save Portfolio Settings
                </button>
              </form>
            </div>
          </div>
        )}

      </div>

      {/* ADD / EDIT PROJECT MODAL */}
      <AnimatePresence>
        {isProjectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsProjectModalOpen(false)}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl glass-card rounded-2xl border border-white/20 shadow-2xl bg-dark-900/95 overflow-hidden z-10 max-h-[90vh] flex flex-col my-auto"
            >
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-display font-bold text-white">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  onClick={() => setIsProjectModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectFormData.title}
                    onChange={(e) => setProjectFormData({ ...projectFormData, title: e.target.value })}
                    placeholder="e.g. Wanderlust Property App"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-accent-sky/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                      Category *
                    </label>
                    <select
                      value={projectFormData.category}
                      onChange={(e) => setProjectFormData({ ...projectFormData, category: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-accent-sky/50"
                    >
                      <option value="Full Stack">Full Stack</option>
                      <option value="Frontend">Frontend</option>
                      <option value="React">React</option>
                      <option value="Backend">Backend</option>
                      <option value="Web Apps">Web Apps</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={projectFormData.displayOrder}
                      onChange={(e) => setProjectFormData({ ...projectFormData, displayOrder: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-accent-sky/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Short Description *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={projectFormData.shortDescription}
                    onChange={(e) => setProjectFormData({ ...projectFormData, shortDescription: e.target.value })}
                    placeholder="Brief description displayed on the portfolio card..."
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-accent-sky/50 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Technologies (comma-separated) *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectFormData.technologies}
                    onChange={(e) => setProjectFormData({ ...projectFormData, technologies: e.target.value })}
                    placeholder="React.js, Node.js, Express, MongoDB, Tailwind"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-accent-sky/50"
                  />
                </div>

                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                    Project Thumbnail Image
                  </label>
                  <div className="flex items-center gap-3">
                    <label className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium cursor-pointer flex items-center gap-2">
                      <Upload className="w-4 h-4 text-accent-sky" />
                      <span>{projectFormData.thumbnailFile ? projectFormData.thumbnailFile.name : 'Upload New File'}</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setProjectFormData({ ...projectFormData, thumbnailFile: e.target.files[0] });
                          }
                        }}
                      />
                    </label>
                    <span className="text-xs text-slate-400">or use image path:</span>
                    <input
                      type="text"
                      value={projectFormData.currentImage}
                      onChange={(e) => setProjectFormData({ ...projectFormData, currentImage: e.target.value })}
                      placeholder="/project-finance.png"
                      className="flex-1 px-3 py-1.5 rounded-xl bg-dark-950 border border-white/10 text-xs text-white"
                    />
                  </div>
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                      Live Demo URL
                    </label>
                    <input
                      type="url"
                      value={projectFormData.liveUrl}
                      onChange={(e) => setProjectFormData({ ...projectFormData, liveUrl: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-accent-sky/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase text-slate-300 mb-1">
                      GitHub Repository URL
                    </label>
                    <input
                      type="url"
                      value={projectFormData.githubUrl}
                      onChange={(e) => setProjectFormData({ ...projectFormData, githubUrl: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white focus:outline-none focus:border-accent-sky/50"
                    />
                  </div>
                </div>

                {/* Detailed Sections for Modal */}
                <div className="border-t border-white/10 pt-4">
                  <h4 className="font-display font-semibold text-white mb-2 text-xs uppercase tracking-wider font-mono">
                    Detailed Modal Breakdown
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Problem Statement</label>
                      <textarea
                        rows={2}
                        value={projectFormData.problem}
                        onChange={(e) => setProjectFormData({ ...projectFormData, problem: e.target.value })}
                        placeholder="What challenge does this project address?"
                        className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Solution Description</label>
                      <textarea
                        rows={2}
                        value={projectFormData.solution}
                        onChange={(e) => setProjectFormData({ ...projectFormData, solution: e.target.value })}
                        placeholder="How did you engineer the solution?"
                        className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Key Features (One per line)</label>
                      <textarea
                        rows={3}
                        value={projectFormData.features}
                        onChange={(e) => setProjectFormData({ ...projectFormData, features: e.target.value })}
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        className="w-full px-3.5 py-2 rounded-xl bg-dark-950 border border-white/10 text-white text-xs resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Toggles */}
                <div className="flex items-center gap-6 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={projectFormData.featured}
                      onChange={(e) => setProjectFormData({ ...projectFormData, featured: e.target.checked })}
                      className="rounded bg-dark-950 border-white/20 text-accent-blue focus:ring-0"
                    />
                    <span className="text-xs text-slate-300">Mark as Featured</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={projectFormData.isPublished}
                      onChange={(e) => setProjectFormData({ ...projectFormData, isPublished: e.target.checked })}
                      className="rounded bg-dark-950 border-white/20 text-accent-blue focus:ring-0"
                    />
                    <span className="text-xs text-slate-300">Publish to Public Portfolio</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsProjectModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white font-medium text-xs shadow-glow-blue"
                  >
                    {editingProject ? 'Save Changes' : 'Create Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE CONFIRMATION MODAL */}
      <AnimatePresence>
        {deleteConfirmProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmProject(null)}
              className="fixed inset-0 bg-dark-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md glass-card rounded-2xl p-6 border border-rose-500/30 bg-dark-900 z-10 space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                Delete Project Confirmation
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Are you sure you want to permanently delete{' '}
                <span className="font-semibold text-white">"{deleteConfirmProject.title}"</span>?
                This action cannot be undone.
              </p>
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmProject(null)}
                  className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteProject}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold"
                >
                  Yes, Delete Project
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LIVE PREVIEW MODAL */}
      {previewProject && (
        <ProjectModal
          project={previewProject}
          onClose={() => setPreviewProject(null)}
        />
      )}

    </div>
  );
};

export default AdminDashboard;
