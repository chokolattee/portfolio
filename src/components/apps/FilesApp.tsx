import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Folder, FolderOpen, FileText, FileCode, Download,
  ChevronRight, File,
} from 'lucide-react';
import { fileTree, bio } from '@/data/portfolioData';
import type { FileNode, AppId } from '@/types/desktop';

interface Props { onOpenApp: (id: AppId) => void }

// ─── Icons ───────────────────────────────────────────────────────────────────
const FILE_ICONS: Record<string, React.ReactNode> = {
  folder: <Folder size={15} className="text-cachy-yellow" />,
  file:   <File size={15} className="text-cachy-subtext" />,
  pdf:    <FileText size={15} className="text-cachy-red" />,
  config: <FileCode size={15} className="text-cachy-cyan" />,
};

// ─── Sidebar item ─────────────────────────────────────────────────────────────
function SidebarItem({
  node, level, selected, onSelect,
}: {
  node: FileNode;
  level: number;
  selected: string | null;
  onSelect: (n: FileNode) => void;
}) {
  const [expanded, setExpanded] = useState(level === 0);

  const toggle = () => {
    if (node.type === 'folder') setExpanded((v) => !v);
    onSelect(node);
  };

  return (
    <div>
      <motion.button
        onClick={toggle}
        whileHover={{ backgroundColor: 'rgba(0,212,170,0.06)' }}
        className={`
          w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left text-xs transition-colors
          ${selected === node.id
            ? 'bg-cachy-teal/15 border border-cachy-teal/30 text-cachy-teal'
            : 'text-cachy-text hover:text-cachy-teal'
          }
        `}
        style={{ paddingLeft: `${8 + level * 12}px` }}
      >
        {node.type === 'folder' && (
          <ChevronRight
            size={10}
            className={`flex-shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
        )}
        {FILE_ICONS[node.type] ?? FILE_ICONS.file}
        <span className="truncate">{node.name}</span>
      </motion.button>

      <AnimatePresence>
        {node.type === 'folder' && expanded && node.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="overflow-hidden"
          >
            {node.children.map((child) => (
              <SidebarItem
                key={child.id}
                node={child}
                level={level + 1}
                selected={selected}
                onSelect={onSelect}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── File preview ─────────────────────────────────────────────────────────────
function FilePreview({ node }: { node: FileNode }) {
  if (node.type === 'folder') {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-cachy-subtext">
        <FolderOpen size={48} className="text-cachy-yellow opacity-60" />
        <span className="text-sm font-mono">{node.name}/</span>
        <span className="text-xs">{node.children?.length ?? 0} items</span>
      </div>
    );
  }

  if (node.type === 'pdf') {
    return (
      <div className="h-full flex flex-col">
        {/* PDF toolbar */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-cachy-border/15 flex-shrink-0">
          <div className="flex items-center gap-2">
            {FILE_ICONS.pdf}
            <span className="font-mono text-xs text-cachy-text">{node.name}</span>
            {node.size && node.modified && (
              <span className="text-[10px] text-cachy-subtext">{node.size} · {node.modified}</span>
            )}
          </div>
          {node.downloadUrl && (
            <a
              href={node.downloadUrl}
              download
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-cachy-teal
                         text-cachy-base font-semibold text-xs hover:bg-cachy-teal/90 transition-colors"
            >
              <Download size={12} />
              Download
            </a>
          )}
        </div>
        {/* Inline PDF viewer */}
        <div className="flex-1 overflow-hidden">
          <iframe
            src={node.downloadUrl ?? ''}
            title={node.name}
            className="w-full h-full border-0"
          />
        </div>
      </div>
    );
  }

  // Text / config
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-3 py-2 border-b border-cachy-border/15">
        <div className="flex items-center gap-2">
          {FILE_ICONS[node.type] ?? FILE_ICONS.file}
          <span className="font-mono text-xs text-cachy-text">{node.name}</span>
        </div>
        <div className="text-[10px] font-mono text-cachy-subtext">
          {node.size} · {node.modified}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <pre className="text-xs font-mono text-cachy-text/90 leading-relaxed whitespace-pre-wrap break-words">
          {node.content}
        </pre>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function FilesApp({ onOpenApp: _onOpenApp }: Props) {
  const [selected, setSelected] = useState<FileNode | null>(null);

  return (
    <div className="h-full flex">
      {/* ── Sidebar ──────────────────────────────────────────────────────────── */}
      <div
        className="w-44 flex-shrink-0 overflow-y-auto p-2 space-y-0.5"
        style={{ borderRight: '1px solid rgba(0,212,170,0.12)' }}
      >
        {/* User badge */}
        <div className="flex items-center gap-2 px-2 py-1.5 mb-2 rounded-lg bg-cachy-surface/60 border border-cachy-border/15">
          <img
            src={bio.avatar}
            alt={bio.name}
            className="w-5 h-5 rounded-full object-cover border border-cachy-teal bg-white"
          />
          <span className="text-[11px] font-mono text-cachy-text truncate">~/{bio.handle}</span>
        </div>

        {/* Places */}
        <div className="text-[10px] font-mono text-cachy-subtext uppercase tracking-widest px-2 py-1">
          Places
        </div>
        <button
          onClick={() => setSelected(null)}
          className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs
                     text-cachy-subtext hover:text-cachy-teal hover:bg-cachy-teal/6 transition-colors"
        >
          <Home size={13} />
          Home
        </button>

        {/* File tree */}
        <div className="mt-2">
          <div className="text-[10px] font-mono text-cachy-subtext uppercase tracking-widest px-2 py-1">
            Files
          </div>
          {fileTree.map((node) => (
            <SidebarItem
              key={node.id}
              node={node}
              level={0}
              selected={selected?.id ?? null}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>

      {/* ── Main area ─────────────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1 px-3 py-2 border-b border-cachy-border/12 text-xs font-mono">
          <button
            onClick={() => setSelected(null)}
            className="text-cachy-subtext hover:text-cachy-teal transition-colors"
          >
            <Home size={12} />
          </button>
          {selected && (
            <>
              <ChevronRight size={10} className="text-cachy-subtext" />
              <span className="text-cachy-text">{selected.name}</span>
            </>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full"
            >
              <FilePreview node={selected} />
            </motion.div>
          ) : (
            <div className="p-4 grid grid-cols-3 sm:grid-cols-4 gap-3 overflow-y-auto h-full content-start">
              {fileTree.map((node) => (
                <motion.button
                  key={node.id}
                  onClick={() => setSelected(node)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl
                             glass border border-cachy-border/15
                             hover:border-cachy-teal/35 hover:bg-cachy-teal/5 transition-all text-center"
                >
                  <span className="text-3xl">
                    {node.type === 'folder' ? '📁' :
                      node.type === 'pdf' ? '📄' :
                        node.type === 'config' ? '⚙️' : '📝'}
                  </span>
                  <span className="text-xs text-cachy-text leading-tight truncate w-full">{node.name}</span>
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
