import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Phone,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { Github, Linkedin } from './Icons';
import { personalInfo } from '../data/portfolioData';
import { contactAPI } from '../services/api';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
  });

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        submitting: false,
        success: false,
        error: 'Please fill in all required fields.',
      });
      return;
    }

    try {
      setStatus({ submitting: true, success: false, error: null });
      const res = await contactAPI.submit(formData);
      if (res.success) {
        setStatus({
          submitting: false,
          success: true,
          error: null,
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(res.message || 'Submission failed');
      }
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: err.message || 'Failed to send message. Please send an email directly to ' + personalInfo.email,
      });
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-violet/20 text-accent-purple text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4">
            Let's Start a <span className="text-gradient-primary">Conversation</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have a project in mind, an internship opportunity, or want to discuss full-stack engineering? I would love to hear from you.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan mx-auto rounded-full mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info & Social Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <h3 className="text-xl font-display font-bold text-white">
                Contact Information
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Feel free to contact me via email or submit a direct message. I typically respond within 24 hours.
              </p>

              {/* Email Card with Copy button */}
              <div className="p-4 rounded-xl bg-dark-800/80 border border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-2.5 rounded-lg bg-accent-blue/10 text-accent-sky border border-accent-blue/20">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-[11px] font-mono text-slate-400 block uppercase">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${personalInfo.email}`}
                      className="text-xs sm:text-sm font-medium text-white hover:text-accent-sky transition-colors truncate block"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Location Card */}
              <div className="p-4 rounded-xl bg-dark-800/80 border border-white/5 flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-accent-violet/10 text-accent-violet border border-accent-violet/20">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block uppercase">
                    Location
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-white">
                    {personalInfo.location}
                  </span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3">
                  Professional Profiles
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-dark-800/80 hover:bg-dark-750 text-slate-200 hover:text-white border border-white/5 hover:border-accent-blue/40 transition-all flex items-center justify-between text-xs font-medium group"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-accent-sky" />
                      <span>LinkedIn</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-accent-sky transition-colors" />
                  </a>

                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-dark-800/80 hover:bg-dark-750 text-slate-200 hover:text-white border border-white/5 hover:border-accent-violet/40 transition-all flex items-center justify-between text-xs font-medium group"
                  >
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-accent-purple" />
                      <span>GitHub</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-accent-purple transition-colors" />
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 shadow-xl">
              <h3 className="text-xl font-display font-bold text-white mb-2">
                Send a Direct Message
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">
                Fill in your details below and your message will be forwarded directly to my inbox.
              </p>

              {status.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-display font-bold text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300">
                    Thank you for reaching out. I have received your message and will respond promptly.
                  </p>
                  <button
                    onClick={() => setStatus({ submitting: false, success: false, error: null })}
                    className="mt-3 px-4 py-2 rounded-xl bg-dark-800 text-xs text-slate-300 hover:text-white border border-white/10"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {status.error && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{status.error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                      >
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-950/70 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-accent-sky/50 focus:ring-1 focus:ring-accent-sky/50 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-dark-950/70 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-accent-sky/50 focus:ring-1 focus:ring-accent-sky/50 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono text-slate-300 uppercase tracking-wider mb-1.5"
                    >
                      Your Message *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Hi Lokesh, I'd like to discuss a developer position or project..."
                      className="w-full px-4 py-2.5 rounded-xl bg-dark-950/70 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-accent-sky/50 focus:ring-1 focus:ring-accent-sky/50 transition-all resize-none"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <p className="text-[11px] text-slate-500 font-mono">
                      🔒 Secure submission with spam protection.
                    </p>

                    <button
                      type="submit"
                      disabled={status.submitting}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue via-indigo-600 to-accent-violet hover:from-accent-sky hover:to-accent-purple text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-2 shadow-glow-blue transition-all disabled:opacity-50"
                      id="contact-submit-btn"
                    >
                      {status.submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
