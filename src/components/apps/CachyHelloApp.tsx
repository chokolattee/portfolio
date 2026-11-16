import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Globe, ExternalLink, Cpu, Terminal, Package, FolderOpen, BarChart2 } from 'lucide-react';
import { bio } from '@/data/portfolioData';
import type { AppId } from '@/types/desktop';

interface Props { onOpenApp: (id: AppId) => void }

const quickApps: { id: AppId; icon: React.ReactNode; label: string; desc: string; color: string }[] = [
  { id: 'konsole', icon: <Terminal size={18} />, label: 'Konsole', desc: 'Open terminal', color: '#00d4aa' },
  { id: 'Projects', icon: <Package size={18} />, label: 'Projects', desc: 'Browse projects', color: '#0ea5e9' },
  { id: 'Files', icon: <FolderOpen size={18} />, label: 'Files', desc: 'Files & resume', color: '#a78bfa' },
  { id: 'Skills', icon: <BarChart2 size={18} />, label: 'Skills++', desc: 'Skills & stack', color: '#f9e2af' },
];

const statusBadges: { label: string; color: string }[] = [
  { label: '4th Year Student', color: '#00d4aa' },
  { label: 'Aspiring Full Stack Dev', color: '#0ea5e9' },
  { label: 'Project Leader', color: '#a78bfa' },
  { label: 'Open for Internships', color: '#f9e2af' }
];

export default function CachyHelloApp({ onOpenApp }: Props) {
  const [launchAtStartup, setLaunchAtStartup] = useState(true);
  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  const toggleStartup = () => {
    setLaunchAtStartup((v) => !v);
    showToast();
  };

  return (
    <div className="h-full flex overflow-hidden">
      {/* ── Left panel: emblem + bio ──────────────────────────────────────── */}
      <div
        className="w-56 flex-shrink-0 flex flex-col items-center justify-center p-6 gap-4"
        style={{
          background: 'linear-gradient(160deg, rgba(0,212,170,0.08) 0%, rgba(14,165,233,0.04) 100%)',
          borderRight: '1px solid rgba(0,212,170,0.15)',
        }}
      >
        {/* Avatar with CachyOS styling */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          className="relative"
        >
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-cachy-teal shadow-cachy-glow bg-white p-0.5">
            <img
              src={bio.avatar}
              alt={bio.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="text-center"
        >
          <div className="text-sm font-bold text-cachy-teal font-mono">{bio.name}</div>
          <div className="text-xs text-cachy-subtext mt-0.5">@{bio.handle}</div>
          <div className="text-xs text-cachy-subtext mt-2 leading-relaxed">{bio.location}</div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex gap-3 mt-1"
        >
          {[
            { href: bio.github, icon: <Github size={15} /> },
            { href: bio.linkedin, icon: <Linkedin size={15} /> },
            { href: `mailto:${bio.email}`, icon: <Mail size={15} /> },
          ].map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cachy-subtext hover:text-cachy-teal transition-colors p-1 rounded"
            >
              {link.icon}
            </a>
          ))}
        </motion.div>
      </div>

      {/* ── Right panel: content ───────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col p-6 gap-5 overflow-y-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-5 bg-cachy-teal rounded-full" />
            <h1 className="text-lg font-bold text-cachy-text">Welcome to My Portfolio</h1>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-xl p-4"
        >
          <p className="text-sm text-cachy-text/90 leading-relaxed">{bio.summary}</p>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {statusBadges.map((b) => (
              <span
                key={b.label}
                className="px-2 py-0.5 rounded-md text-xs font-mono border"
                style={{ color: b.color, borderColor: `${b.color}40`, background: `${b.color}1a` }}
              >
                {b.label}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Quick launch */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-xs font-mono text-cachy-subtext uppercase tracking-widest mb-2 ml-0.5">
            Quick Launch
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickApps.map((app, i) => (
              <motion.button
                key={app.id}
                onClick={() => onOpenApp(app.id)}
                whileHover={{ scale: 1.02, borderColor: app.color }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.06 }}
                className="flex items-center gap-3 p-3 rounded-xl glass border border-cachy-border/20
                           text-left hover:bg-white/5 transition-all"
              >
                <span style={{ color: app.color }}>{app.icon}</span>
                <div>
                  <div className="text-sm font-medium text-cachy-text">{app.label}</div>
                  <div className="text-xs text-cachy-subtext">{app.desc}</div>
                </div>
                <ExternalLink size={12} className="ml-auto text-cachy-subtext opacity-50" />
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* System badges */}

        {/* Launch at startup toggle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between pt-2 mt-auto border-t border-cachy-border/15"
        >
          <span className="text-xs text-cachy-subtext font-mono">Launch at startup</span>
          <button
            onClick={toggleStartup}
            className={`
              relative w-10 h-5 rounded-full transition-colors duration-200
              ${launchAtStartup ? 'bg-cachy-teal' : 'bg-cachy-muted'}
            `}
          >
            <motion.div
              className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow"
              animate={{ x: launchAtStartup ? 20 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>
        </motion.div>
      </div>

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2
                       glass rounded-xl px-4 py-2 text-sm font-mono text-cachy-teal
                       border border-cachy-teal/30 shadow-cachy-glow z-50"
          >
            {launchAtStartup ? '✓ Will show on startup' : '✗ Disabled at startup'}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
