import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { commandMap, FASTFETCH_OUTPUT } from '@/data/terminalCommands';
import type { AppId } from '@/types/desktop';

interface HistoryEntry {
  id: number;
  type: 'input' | 'output' | 'ascii';
  content: string;
}

const PROMPT = `\x1b[1;32mchoko\x1b[0m@\x1b[1;36mcachyos\x1b[0m \x1b[1;34m~\x1b[0m ❯ `;

function AnsiText({ text }: { text: string }) {
  const toHtml = (raw: string) => {
    const colorMap: Record<string, string> = {
      '32': '#00d4aa',
      '33': '#f9e2af',
      '34': '#0ea5e9',
      '35': '#a78bfa',
      '36': '#0ea5e9',
      '31': '#f38ba8',
      '0': 'inherit',
      '1': 'inherit',
    };
    const parts = raw.split(/(\x1b\[[0-9;]*m)/);
    let bold = false;
    let color = 'inherit';

    return parts.map((part, i) => {
      const m = part.match(/\x1b\[([0-9;]*)m/);
      if (m) {
        const codes = m[1].split(';');
        codes.forEach((c) => {
          if (c === '1') bold = true;
          else if (c === '0') { bold = false; color = 'inherit'; }
          else if (colorMap[c]) color = colorMap[c];
        });
        return null;
      }
      return (
        <span key={i} style={{ color, fontWeight: bold ? 700 : 400 }}>
          {part}
        </span>
      );
    });
  };

  return <span>{toHtml(text)}</span>;
}

const PILL_COMMANDS = [
  { label: 'help', cmd: 'help' },
  { label: 'whoami', cmd: 'whoami' },
  { label: 'projects', cmd: 'projects' },
  { label: 'skills', cmd: 'skills' },
  { label: 'contact', cmd: 'contact' },
  { label: 'clear', cmd: 'clear' },
];

let entryId = 0;
const nextId = () => ++entryId;

interface Props { onOpenApp: (id: AppId) => void }

export default function KonsoleApp({ onOpenApp }: Props) {
  const [history, setHistory] = useState<HistoryEntry[]>([
    { id: nextId(), type: 'ascii', content: FASTFETCH_OUTPUT },
    { id: nextId(), type: 'output', content: '\x1b[1;36mWelcome! Type \x1b[1;32mhelp\x1b[1;36m or tap a command pill below.\x1b[0m' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add input line
    setHistory((h) => [...h, { id: nextId(), type: 'input', content: cmd }]);
    setCmdHistory((h) => [cmd, ...h]);
    setHistIdx(-1);
    setInput('');

    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const output = commandMap[trimmed] ?? `\x1b[1;31mfish: Unknown command: ${cmd}\x1b[0m\nType \x1b[1;32mhelp\x1b[0m for available commands.`;
    setHistory((h) => [...h, { id: nextId(), type: 'output', content: output }]);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      runCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(histIdx + 1, cmdHistory.length - 1);
      setHistIdx(next);
      setInput(cmdHistory[next] ?? '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(histIdx - 1, -1);
      setHistIdx(next);
      setInput(next === -1 ? '' : (cmdHistory[next] ?? ''));
    }
  };

  return (
    <div
      className="flex flex-col h-full bg-[#0d1b22] font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      {/* ── Terminal output ─────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-3 space-y-0.5 leading-relaxed">
        <AnimatePresence initial={false}>
          {history.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12 }}
              className="whitespace-pre-wrap break-words"
            >
              {entry.type === 'input' ? (
                <div className="flex gap-1">
                  <AnsiText text={PROMPT} />
                  <span className="text-cachy-text">{entry.content}</span>
                </div>
              ) : (
                <div className="text-cachy-text/90 pl-0">
                  <AnsiText text={entry.content} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Current prompt line */}
        <div className="flex gap-1 items-center pt-0.5">
          <AnsiText text={PROMPT} />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-cachy-teal caret-cachy-teal"
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
        </div>

        <div ref={bottomRef} />
      </div>

      {/* ── Command pills ───────────────────────────────────────────────────── */}
      <div className="border-t border-cachy-border/15 p-2">
        <div className="flex flex-wrap gap-1.5">
          {PILL_COMMANDS.map((p) => (
            <motion.button
              key={p.cmd}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => runCommand(p.cmd)}
              className="px-2 py-0.5 rounded-md text-xs font-mono
                         bg-cachy-teal/10 border border-cachy-teal/25
                         text-cachy-teal hover:bg-cachy-teal/20 hover:border-cachy-teal/50
                         transition-colors"
            >
              {p.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
