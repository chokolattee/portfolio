import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Globe, Download, X, Copy, Check, ExternalLink } from 'lucide-react';
import { projects } from '@/data/portfolioData';
import type { PortfolioProject, AppId } from '@/types/desktop';

interface Props { onOpenApp: (id: AppId) => void }

const STATUS_TABS = ['all', 'ongoing', 'completed', 'coursework'] as const;
type StatusFilter = typeof STATUS_TABS[number];

const STATUS_COLORS: Record<'ongoing' | 'completed' | 'coursework', string> = {
  ongoing: 'text-cachy-yellow bg-cachy-yellow/10 border-cachy-yellow/30',
  completed: 'text-cachy-teal bg-cachy-teal/10 border-cachy-teal/30',
  coursework: 'text-cachy-purple bg-cachy-purple/10 border-cachy-purple/30',
};

function PackageRow({
  pkg,
  onSelect,
}: { pkg: PortfolioProject; onSelect: () => void }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      onClick={onSelect}
      whileHover={{ backgroundColor: 'rgba(0,212,170,0.04)' }}
      className="w-full text-left grid gap-x-4 items-start px-3 py-2.5
                 border-b border-cachy-border/10 last:border-0 transition-colors"
      style={{ gridTemplateColumns: '140px 1fr auto' }}
    >
      {/* Package name */}
      <span className="font-mono text-xs text-cachy-subtext pt-0.5 truncate">
        {pkg.name}
      </span>

      {/* Info */}
      <div>
        <div className="text-sm font-medium text-cachy-text">{pkg.description}</div>
        <div className="flex flex-wrap gap-1 mt-1">
          {pkg.tags.map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 rounded text-[10px] font-mono
                         bg-cachy-muted text-cachy-subtext"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-col items-end gap-1">
        <span className={`px-1.5 py-0.5 rounded border text-[10px] font-mono ${STATUS_COLORS[pkg.status]}`}>
          {pkg.status}
        </span>
        {pkg.liveUrl && (
          <span className="flex items-center gap-1 text-[10px] font-mono text-cachy-cyan">
            <span className="w-1.5 h-1.5 rounded-full bg-cachy-cyan animate-pulse" />
            live
          </span>
        )}
      </div>
    </motion.button>
  );
}

function PackageModal({
  pkg,
  onClose,
}: { pkg: PortfolioProject; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(pkg.cloneUrl).catch(() => { });
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center
                 justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, scale: 0.95 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 40, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
        className="glass rounded-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-cachy-border/20">
          <div className="flex items-center gap-2">
            <span className="font-mono text-base font-bold text-cachy-text">
              {pkg.name}
            </span>
            <span className={`px-1.5 py-0.5 rounded border text-[10px] font-mono ${STATUS_COLORS[pkg.status]}`}>
              {pkg.status}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-cachy-subtext hover:text-cachy-red transition-colors p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          <p className="text-sm text-cachy-text/90 leading-relaxed">{pkg.longDescription}</p>

          {/* Tags */}
          <div>
            <div className="text-xs font-mono text-cachy-subtext mb-2 uppercase tracking-wider">
              Dependencies / Stack
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pkg.tags.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-md text-xs font-mono
                             bg-cachy-teal/10 border border-cachy-teal/25 text-cachy-teal"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Live Section */}
          {pkg.liveUrl && (
            <div>
              <div className="text-xs font-mono text-cachy-subtext mb-1.5 uppercase tracking-wider">
                Live
              </div>
              <a
                href={pkg.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-cachy-base/80 rounded-xl border border-cachy-cyan/30 hover:border-cachy-cyan/60 px-3 py-2 text-cachy-cyan transition-colors group"
              >
                <Globe size={14} className="flex-shrink-0" />
                <span className="flex-1 text-xs font-mono truncate">{pkg.liveUrl}</span>
                <ExternalLink size={13} className="flex-shrink-0 opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          )}

          {/* Clone command */}
          <div>
            <div className="text-xs font-mono text-cachy-subtext mb-1.5 uppercase tracking-wider">
              git clone
            </div>
            <div className="flex items-center gap-2 bg-cachy-base/80 rounded-xl border border-cachy-border/20 px-3 py-2">
              <code className="flex-1 text-xs font-mono text-cachy-teal truncate">
                {pkg.cloneUrl}
              </code>
              <button
                onClick={copy}
                className="text-cachy-subtext hover:text-cachy-teal transition-colors flex-shrink-0"
              >
                <AnimatePresence mode="wait">
                  {copied
                    ? <motion.span key="check" initial={{ scale: 0.5 }} animate={{ scale: 1 }}><Check size={14} className="text-cachy-teal" /></motion.span>
                    : <motion.span key="copy" initial={{ scale: 0.5 }} animate={{ scale: 1 }}><Copy size={14} /></motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-cachy-teal font-mono mt-1 ml-1"
                >
                  Copied to clipboard!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 pt-0 flex gap-2">
          <a
            href={pkg.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl
                       bg-cachy-teal text-cachy-base font-semibold text-sm
                       hover:bg-cachy-teal/90 transition-colors"
          >
            <ExternalLink size={14} />
            View on GitHub
          </a>
          <button
            onClick={copy}
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl
                       glass border border-cachy-border/30 text-cachy-text text-sm
                       hover:border-cachy-teal/40 transition-colors"
          >
            <Download size={14} />
            Install
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsApp({ onOpenApp: _onOpenApp }: Props) {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selected, setSelected] = useState<PortfolioProject | null>(null);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      const matchQuery = !query || [p.name, p.description, ...p.tags].some((s) =>
        s.toLowerCase().includes(query.toLowerCase())
      );
      return matchStatus && matchQuery;
    });
  }, [query, statusFilter]);

  return (
    <div className="relative h-full flex flex-col">
      {/* ── Toolbar ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-cachy-border/15">
        {/* Search */}
        <div className="flex-1 flex items-center gap-2 bg-cachy-base/60 rounded-lg
                        border border-cachy-border/20 px-2 py-1.5">
          <Search size={13} className="text-cachy-subtext flex-shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages…"
            className="bg-transparent border-none outline-none text-xs text-cachy-text
                       placeholder:text-cachy-subtext flex-1 font-mono"
          />
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-1">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-2 py-1 rounded-md text-[11px] font-mono transition-colors
                ${statusFilter === tab
                  ? 'bg-cachy-teal/20 border border-cachy-teal/40 text-cachy-teal'
                  : 'text-cachy-subtext hover:text-cachy-text'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Column headers ───────────────────────────────────────────────────── */}
      <div
        className="grid gap-x-4 px-3 py-1.5 border-b border-cachy-border/10
                   text-[10px] font-mono text-cachy-subtext uppercase tracking-wider"
        style={{ gridTemplateColumns: '140px 1fr auto' }}
      >
        <span>Package</span>
        <span>Description</span>
        <span className="text-right">Status</span>
      </div>

      {/* ── Package list ─────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence>
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-32 gap-2"
            >
              <span className="text-2xl">📦</span>
              <span className="text-sm text-cachy-subtext font-mono">No packages found</span>
            </motion.div>
          ) : (
            filtered.map((pkg) => (
              <PackageRow key={pkg.id} pkg={pkg} onSelect={() => setSelected(pkg)} />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* ── Status bar ───────────────────────────────────────────────────────── */}
      <div className="px-3 py-1.5 border-t border-cachy-border/10 flex items-center gap-3
                      text-[11px] font-mono text-cachy-subtext">
        <span>{filtered.length} packages</span>
        <span>·</span>
        <span className="text-cachy-cyan">
          {projects.filter((p) => Boolean(p.liveUrl)).length} live
        </span>
      </div>

      {/* ── Detail modal ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <PackageModal pkg={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
