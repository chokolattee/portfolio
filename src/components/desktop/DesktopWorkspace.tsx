'use client';
import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import {
  Palette,
  Terminal,
  RotateCw,
  User,
  Sparkles,
  Layout,
  Upload,
} from 'lucide-react';
import TopBar from './TopBar';
import BottomDock from './BottomDock';
import DesktopWindow from './DesktopWindow';
import DesktopIcons from './DesktopIcons';
import KonsoleApp from '../apps/KonsoleApp';
import CachyHelloApp from '../apps/CachyHelloApp';
import ProjectsApp from '../apps/ProjectsApp';
import FilesApp from '../apps/FilesApp';
import SkillsApp from '../apps/SkillsApp';
import AppearanceApp from '../apps/AppearanceApp';
import { appDefinitions, bio } from '@/data/portfolioData';
import {
  wallpapers,
  DEFAULT_WALLPAPER_ID,
  desktopEnvironments,
} from '@/data/wallpapers';
import type {
  WindowState,
  AppId,
  WallpaperId,
  DesktopEnvironment,
} from '@/types/desktop';

// ── Z-index Counter ───────────────────────────────────────────────────────────
let zCounter = 10;
const nextZ = () => ++zCounter;

// ── App Normalizer ───────────────────────────────────────────────────────────
function normalizeAppId(id: string): AppId {
  if (id === 'cachy-hello') return 'cachyhello';
  if (id === 'settings') return 'appearance';
  return id as AppId;
}

function buildInitialWindows(): WindowState[] {
  return appDefinitions.map((def) => {
    const normalized = normalizeAppId(def.id);
    return {
      id: normalized,
      appId: normalized,
      title: def.label,
      isOpen: false,
      isMinimized: false,
      isMaximized: false,
      position: { ...def.defaultPosition },
      size: { ...def.defaultSize },
      zIndex: nextZ(),
    };
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function DesktopWorkspace() {
  const [windows, setWindows] = useState<WindowState[]>(buildInitialWindows);
  const [isMobile, setIsMobile] = useState(false);
  const [activeApp, setActiveApp] = useState<AppId | null>(null);

  // ── Desktop Environment State ──────────────────────────────────────────────
  const [desktopEnv, setDesktopEnv] = useState<DesktopEnvironment>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cachy_de');
      if (
        saved &&
        desktopEnvironments.some((d) => d.id === saved)
      ) {
        return saved as DesktopEnvironment;
      }
    }
    return 'kde';
  });

  // ── Wallpaper State & Persistence ──────────────────────────────────────────
  const [wallpaperId, setWallpaperId] = useState<WallpaperId>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cachy_wallpaper');
      if (
        saved === 'custom' ||
        (saved && wallpapers.some((w) => w.id === saved))
      ) {
        return saved as WallpaperId;
      }
    }
    return DEFAULT_WALLPAPER_ID;
  });

  const [customWallpaperDataUrl, setCustomWallpaperDataUrl] = useState<
    string | null
  >(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cachy_custom_wallpaper');
    }
    return null;
  });

  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
  } | null>(null);

  // Detect mobile
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Sync wallpaper & DE to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cachy_wallpaper', wallpaperId);
    }
  }, [wallpaperId]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cachy_de', desktopEnv);
    }
  }, [desktopEnv]);

  // Open CachyHello on first load
  useEffect(() => {
    openApp('cachyhello');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close context menu on outside click or escape
  useEffect(() => {
    const closeMenu = () => setContextMenu(null);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setContextMenu(null);
    };
    window.addEventListener('click', closeMenu);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('click', closeMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // ── Custom Wallpaper Handlers ──────────────────────────────────────────────
  const handleUploadCustomWallpaper = useCallback((dataUrl: string) => {
    setCustomWallpaperDataUrl(dataUrl);
    setWallpaperId('custom');
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('cachy_custom_wallpaper', dataUrl);
      } catch {
        // quota safety
      }
    }
  }, []);

  const handleRemoveCustomWallpaper = useCallback(() => {
    setCustomWallpaperDataUrl(null);
    setWallpaperId(DEFAULT_WALLPAPER_ID);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cachy_custom_wallpaper');
    }
  }, []);

  // ── Wallpaper Cycle Handler ─────────────────────────────────────────────────
  const cycleWallpaper = useCallback(() => {
    setWallpaperId((prev) => {
      const idx = wallpapers.findIndex((w) => w.id === prev);
      const nextIdx = (idx + 1) % wallpapers.length;
      return wallpapers[nextIdx].id;
    });
  }, []);

  // ── DE Cycle Handler ───────────────────────────────────────────────────────
  const cycleDE = useCallback(() => {
    setDesktopEnv((prev) => {
      const idx = desktopEnvironments.findIndex((d) => d.id === prev);
      const nextIdx = (idx + 1) % desktopEnvironments.length;
      return desktopEnvironments[nextIdx].id;
    });
  }, []);

  const currentWallpaper =
    wallpapers.find((w) => w.id === wallpaperId) || wallpapers[0];

  const activeWallpaperStyle: React.CSSProperties =
    wallpaperId === 'custom' && customWallpaperDataUrl
      ? {
        backgroundColor: '#0b1116',
        backgroundImage: `url(${customWallpaperDataUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }
      : currentWallpaper.style;

  const currentWallpaperName =
    wallpaperId === 'custom' ? 'Custom Image' : currentWallpaper.name;

  // ── Window actions ──────────────────────────────────────────────────────────
  const openApp = useCallback(
    (appId: AppId) => {
      const targetId = normalizeAppId(appId);

      if (isMobile) {
        setActiveApp(targetId);
        return;
      }

      setWindows((prev) => {
        const existing = prev.find(
          (w) => normalizeAppId(w.appId) === targetId
        );

        if (!existing) {
          const def = appDefinitions.find(
            (d) => normalizeAppId(d.id) === targetId
          );
          return [
            ...prev,
            {
              id: targetId,
              appId: targetId,
              title: def?.label || targetId,
              isOpen: true,
              isMinimized: false,
              isMaximized: false,
              position: def?.defaultPosition || { x: 120, y: 80 },
              size: def?.defaultSize || { width: 720, height: 500 },
              zIndex: nextZ(),
            },
          ];
        }

        return prev.map((w) =>
          normalizeAppId(w.appId) === targetId
            ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ() }
            : w
        );
      });
    },
    [isMobile]
  );

  const closeApp = useCallback(
    (appId: AppId) => {
      const targetId = normalizeAppId(appId);
      setWindows((prev) =>
        prev.map((w) =>
          normalizeAppId(w.appId) === targetId ? { ...w, isOpen: false } : w
        )
      );
      if (isMobile && activeApp === targetId) setActiveApp(null);
    },
    [isMobile, activeApp]
  );

  const minimizeApp = useCallback((appId: AppId) => {
    const targetId = normalizeAppId(appId);
    setWindows((prev) =>
      prev.map((w) =>
        normalizeAppId(w.appId) === targetId ? { ...w, isMinimized: true } : w
      )
    );
  }, []);

  const maximizeApp = useCallback((appId: AppId) => {
    const targetId = normalizeAppId(appId);
    setWindows((prev) =>
      prev.map((w) =>
        normalizeAppId(w.appId) === targetId
          ? { ...w, isMaximized: !w.isMaximized, zIndex: nextZ() }
          : w
      )
    );
  }, []);

  const focusApp = useCallback((appId: AppId) => {
    const targetId = normalizeAppId(appId);
    setWindows((prev) =>
      prev.map((w) =>
        normalizeAppId(w.appId) === targetId ? { ...w, zIndex: nextZ() } : w
      )
    );
  }, []);

  const updatePosition = useCallback(
    (appId: AppId, position: { x: number; y: number }) => {
      const targetId = normalizeAppId(appId);
      setWindows((prev) =>
        prev.map((w) =>
          normalizeAppId(w.appId) === targetId ? { ...w, position } : w
        )
      );
    },
    []
  );

  const updateSize = useCallback(
    (appId: AppId, size: { width: number; height: number }) => {
      const targetId = normalizeAppId(appId);
      setWindows((prev) =>
        prev.map((w) =>
          normalizeAppId(w.appId) === targetId ? { ...w, size } : w
        )
      );
    },
    []
  );

  // ── Render App Component Body ───────────────────────────────────────────────
  const renderAppContent = (appId: AppId) => {
    const normalized = normalizeAppId(appId);
    switch (normalized) {
      case 'appearance':
      case 'settings':
        return (
          <AppearanceApp
            currentWallpaperId={wallpaperId}
            customWallpaperDataUrl={customWallpaperDataUrl}
            onSelectWallpaper={setWallpaperId}
            onUploadCustomWallpaper={handleUploadCustomWallpaper}
            onRemoveCustomWallpaper={handleRemoveCustomWallpaper}
            currentDE={desktopEnv}
            onSelectDE={setDesktopEnv}
            onOpenApp={openApp}
          />
        );
      case 'konsole':
        return <KonsoleApp onOpenApp={openApp} />;
      case 'cachyhello':
      case 'cachy-hello':
        return <CachyHelloApp onOpenApp={openApp} />;
      case 'Projects':
        return <ProjectsApp onOpenApp={openApp} />;
      case 'Files':
        return <FilesApp onOpenApp={openApp} />;
      case 'Skills':
        return <SkillsApp onOpenApp={openApp} />;
      default:
        return <CachyHelloApp onOpenApp={openApp} />;
    }
  };

  // ── Mobile shell ─────────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <MotionConfig reducedMotion="user">
        <div className="relative flex flex-col h-dvh overflow-hidden select-none">
          {/* Animated Wallpaper Layer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={wallpaperId + (customWallpaperDataUrl ? '-custom' : '')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 -z-10"
              style={activeWallpaperStyle}
            />
          </AnimatePresence>

          <TopBar
            isMobile
            onOpenApp={openApp}
            onCycleWallpaper={cycleWallpaper}
            currentWallpaperName={currentWallpaperName}
            currentDE={desktopEnv}
            onCycleDE={cycleDE}
          />

          <div className="flex-1 overflow-hidden relative">
            {!activeApp && (
              <div className="flex flex-col items-center justify-center h-full gap-5 p-6">
                <div className="text-center">
                  <div className="relative inline-block mb-3">
                    <img
                      src={bio.avatar}
                      alt={bio.name}
                      className="w-20 h-20 rounded-2xl mx-auto border-2 border-cachy-teal shadow-cachy-glow object-cover bg-white"
                    />
                    <span className="absolute -bottom-1 -right-1 text-base">
                      🐧
                    </span>
                  </div>
                  <h1 className="text-xl font-bold text-cachy-teal font-mono">
                    {bio.name}
                  </h1>
                  <p className="text-cachy-subtext mt-1 text-xs">
                    {bio.title}
                  </p>
                </div>
                <DesktopIcons onOpenApp={openApp} mobile />
              </div>
            )}
            {activeApp && (
              <div className="h-full overflow-auto bg-cachy-base/95 backdrop-blur-md">
                {renderAppContent(activeApp)}
              </div>
            )}
          </div>

          <BottomDock
            windows={windows}
            onOpenApp={openApp}
            onMinimize={minimizeApp}
            isMobile
            activeAppId={activeApp}
            desktopEnv={desktopEnv}
          />
        </div>
      </MotionConfig>
    );
  }

  // ── Desktop shell ─────────────────────────────────────────────────────────────
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative w-screen h-screen overflow-hidden select-none bg-cachy-base">
        {/* Animated Wallpaper Layer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={wallpaperId + (customWallpaperDataUrl ? '-custom' : '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="absolute inset-0 pointer-events-none select-none"
            style={activeWallpaperStyle}
          />
        </AnimatePresence>

        {/* Top status bar */}
        <TopBar
          onOpenApp={openApp}
          onCycleWallpaper={cycleWallpaper}
          currentWallpaperName={currentWallpaperName}
          currentDE={desktopEnv}
          onCycleDE={cycleDE}
        />

        {/* Desktop canvas */}
        <div
          className="absolute inset-0"
          style={{
            top: 32,
            bottom: desktopEnv === 'xfce' ? 44 : 72,
            left: desktopEnv === 'gnome' ? 68 : 0,
          }}
          onContextMenu={(e) => {
            if (e.target === e.currentTarget) {
              e.preventDefault();
              setContextMenu({ x: e.clientX, y: e.clientY });
            }
          }}
          onClick={() => setContextMenu(null)}
        >
          {/* Desktop shortcut icons */}
          <DesktopIcons onOpenApp={openApp} />

          {/* Floating Application Windows */}
          {windows.map((win) => {
            if (!win.isOpen || win.isMinimized) return null;
            return (
              <DesktopWindow
                key={win.id}
                window={win}
                onClose={() => closeApp(win.appId)}
                onMinimize={() => minimizeApp(win.appId)}
                onMaximize={() => maximizeApp(win.appId)}
                onFocus={() => focusApp(win.appId)}
                onMove={(pos) => updatePosition(win.appId, pos)}
                onResize={(size) => updateSize(win.appId, size)}
              >
                {renderAppContent(win.appId)}
              </DesktopWindow>
            );
          })}
        </div>

        {/* Desktop Right-Click Context Menu */}
        <AnimatePresence>
          {contextMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.12 }}
              style={{
                top: Math.min(
                  contextMenu.y,
                  typeof window !== 'undefined'
                    ? window.innerHeight - 280
                    : 400
                ),
                left: Math.min(
                  contextMenu.x,
                  typeof window !== 'undefined' ? window.innerWidth - 240 : 600
                ),
              }}
              className="fixed z-50 glass rounded-xl p-1.5 w-56 shadow-cachy-lg border border-cachy-border/30 font-sans"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-2.5 py-1 text-[10px] font-mono text-cachy-subtext uppercase tracking-widest border-b border-cachy-border/15 mb-1 flex items-center justify-between">
                <span>CachyOS Shell</span>
                <Sparkles size={11} className="text-cachy-teal" />
              </div>

              <button
                onClick={() => {
                  setContextMenu(null);
                  openApp('appearance');
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-cachy-text hover:bg-cachy-teal/15 hover:text-cachy-teal transition-colors text-left"
              >
                <Palette size={14} className="text-cachy-teal" />
                <span>Change Wallpaper & Theme...</span>
              </button>

              <button
                onClick={() => {
                  setContextMenu(null);
                  cycleDE();
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-cachy-text hover:bg-cachy-teal/15 hover:text-cachy-teal transition-colors text-left"
              >
                <Layout size={14} className="text-cachy-yellow" />
                <span>
                  Switch DE ({desktopEnv.toUpperCase()})
                </span>
              </button>

              <button
                onClick={() => {
                  setContextMenu(null);
                  cycleWallpaper();
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-cachy-text hover:bg-cachy-teal/15 hover:text-cachy-teal transition-colors text-left"
              >
                <RotateCw size={14} className="text-cachy-cyan" />
                <span>Next Wallpaper Preset</span>
              </button>

              <button
                onClick={() => {
                  setContextMenu(null);
                  openApp('konsole');
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-cachy-text hover:bg-cachy-teal/15 hover:text-cachy-teal transition-colors text-left"
              >
                <Terminal size={14} className="text-cachy-purple" />
                <span>Open Konsole</span>
              </button>

              <button
                onClick={() => {
                  setContextMenu(null);
                  openApp('cachyhello');
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-cachy-text hover:bg-cachy-teal/15 hover:text-cachy-teal transition-colors text-left"
              >
                <User size={14} className="text-cachy-yellow" />
                <span>About Me</span>
              </button>

              <div className="my-1 border-t border-cachy-border/15" />

              <button
                onClick={() => setContextMenu(null)}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs text-cachy-subtext hover:bg-white/5 hover:text-cachy-text transition-colors text-left font-mono text-[11px]"
              >
                <RotateCw size={12} />
                <span>Refresh Desktop</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom dock / panel */}
        <BottomDock
          windows={windows}
          onOpenApp={openApp}
          onMinimize={minimizeApp}
          desktopEnv={desktopEnv}
        />
      </div>
    </MotionConfig>
  );
}
