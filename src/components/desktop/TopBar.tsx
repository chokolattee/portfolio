import React, { useState, useEffect } from 'react';
import { Wifi, Volume2, Battery, Palette, Layout } from 'lucide-react';
import { motion } from 'framer-motion';
import { bio } from '@/data/portfolioData';
import { desktopEnvironments } from '@/data/wallpapers';
import type { AppId, DesktopEnvironment } from '@/types/desktop';

interface Props {
  isMobile?: boolean;
  onOpenApp: (id: AppId) => void;
  onCycleWallpaper?: () => void;
  currentWallpaperName?: string;
  currentDE?: DesktopEnvironment;
  onCycleDE?: () => void;
}

function useClock() {
  const [time, setTime] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function TopBar({
  isMobile,
  onOpenApp,
  onCycleWallpaper,
  currentWallpaperName,
  currentDE = 'kde',
  onCycleDE,
}: Props) {
  const time = useClock();

  const timeStr = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  const dateStr = time.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const activeDeConfig =
    desktopEnvironments.find((d) => d.id === currentDE) || desktopEnvironments[0];

  return (
    <div className="topbar-panel relative flex items-center justify-between px-3 h-8 z-50 no-select">
      {/* ── Left: launcher + window title ─────────────────────────────────── */}
      <div className="flex items-center gap-2.5">
        {/* Brand / Portfolio button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onOpenApp('cachyhello')}
          className="relative flex items-center gap-2 text-cachy-teal hover:text-cachy-teal/90 transition-colors"
          aria-label="My Portfolio"
          title="Open Profile"
        >
          <img
            src="/avatar.jpg"
            alt="Mary Pauline Calungsod"
            className="w-5 h-5 rounded-full object-cover border border-cachy-teal shadow-sm bg-cachy-dark"
          />
          <span className="text-xs font-semibold font-mono text-cachy-text">
            My Portfolio
          </span>
        </motion.button>

        {/* Separator */}
        <div className="w-px h-4 bg-cachy-border/20" />

        {/* Desktop Environment Switcher Pill */}
        {onCycleDE && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCycleDE}
            className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-cachy-surface/80 border border-cachy-border/25 hover:border-cachy-teal/40 transition-colors text-[11px] font-mono"
            title={`Click to cycle desktop environment (Current: ${activeDeConfig.name})`}
          >
            <Layout size={11} className="text-cachy-teal" />
            <span className="text-cachy-text font-medium">{activeDeConfig.name}</span>
          </motion.button>
        )}

        {/* Active window telemetry */}
        <span className="text-xs font-mono text-cachy-subtext hidden lg:block">
          x86-64-v4 • BORE • {activeDeConfig.badge}
        </span>
      </div>

      {/* ── Center: date (desktop) ─────────────────────────────────────────── */}
      <div className="absolute left-1/2 -translate-x-1/2 text-xs font-mono text-cachy-text hidden sm:block">
        {dateStr}
      </div>

      {/* ── Right: system tray ─────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-cachy-subtext">
        {/* Wallpaper Quick Switcher Button */}
        {onCycleWallpaper && (
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.9 }}
            onClick={onCycleWallpaper}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded text-cachy-subtext hover:text-cachy-teal hover:bg-cachy-teal/10 transition-colors"
            title={`Click to cycle wallpaper (Current: ${currentWallpaperName || 'Default'})`}
            aria-label="Cycle Wallpaper"
          >
            <Palette size={13} className="text-cachy-teal" />
            <span className="text-[10px] font-mono hidden xl:inline text-cachy-teal/80">
              Wallpaper
            </span>
          </motion.button>
        )}

        <Wifi size={13} className="hidden sm:block" />
        <Volume2 size={13} className="hidden sm:block" />
        <Battery size={13} className="hidden sm:block" />
        <div className="w-px h-3 bg-cachy-border/20 hidden sm:block" />

        {/* User profile pill */}
        <button
          onClick={() => onOpenApp('cachyhello')}
          className="flex items-center gap-1.5 px-1.5 py-0.5 rounded-full hover:bg-cachy-teal/10 border border-cachy-border/20 transition-colors"
          title="Open Profile"
        >
          <img
            src={bio.avatar}
            alt={bio.name}
            className="w-4 h-4 rounded-full object-cover border border-cachy-teal bg-white"
          />
          <span className="text-[11px] font-mono text-cachy-text hidden md:inline">
            {bio.handle}
          </span>
        </button>

        <span className="text-xs font-mono text-cachy-text">{timeStr}</span>
      </div>
    </div>
  );
}
