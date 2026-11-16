import React from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { appDefinitions } from '@/data/portfolioData';
import type { WindowState, AppId, DesktopEnvironment } from '@/types/desktop';

interface Props {
  windows: WindowState[];
  onOpenApp: (id: AppId) => void;
  onMinimize?: (id: AppId) => void;
  isMobile?: boolean;
  activeAppId?: AppId | null;
  desktopEnv?: DesktopEnvironment;
}

function DockIcon({
  app,
  isOpen,
  isActive,
  onClick,
  isVertical,
}: {
  app: (typeof appDefinitions)[0];
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
  isVertical?: boolean;
}) {
  const scale = useSpring(1, { stiffness: 260, damping: 18 });

  return (
    <motion.div className="relative flex flex-col items-center gap-1">
      <motion.button
        onClick={onClick}
        onHoverStart={() => scale.set(1.3)}
        onHoverEnd={() => scale.set(1)}
        style={{ scale }}
        whileTap={{ scale: 0.88 }}
        className={`
          relative w-12 h-12 rounded-xl flex items-center justify-center text-2xl
          transition-all duration-150 cursor-pointer focus:outline-none
          ${isActive
            ? 'bg-cachy-teal/20 border border-cachy-teal/60 shadow-cachy-glow'
            : 'glass hover:border-cachy-teal/40 hover:bg-cachy-teal/10'
          }
        `}
        aria-label={app.label}
        title={app.label}
      >
        {app.icon}
      </motion.button>

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileHover={{ opacity: 1, scale: 1 }}
        className={`
          absolute pointer-events-none bg-cachy-surface/95 border border-cachy-border/30 rounded-md
          px-2 py-1 text-[11px] font-mono text-cachy-text whitespace-nowrap shadow-cachy z-50
          ${isVertical
            ? 'left-14 top-1/2 -translate-y-1/2'
            : '-top-9 left-1/2 -translate-x-1/2'
          }
        `}
      >
        {app.label}
      </motion.div>

      {/* Active indicator dot */}
      {isOpen && (
        <motion.div
          layoutId={`dot-${app.id}`}
          className="w-1.5 h-1.5 rounded-full bg-cachy-teal"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        />
      )}
    </motion.div>
  );
}

export default function BottomDock({
  windows,
  onOpenApp,
  onMinimize,
  isMobile,
  activeAppId,
  desktopEnv = 'kde',
}: Props) {
  const handleClick = (appId: AppId) => {
    const win = windows.find((w) => w.appId === appId);
    if (!win) {
      onOpenApp(appId);
      return;
    }

    if (win.isOpen && !win.isMinimized) {
      onMinimize?.(appId);
    } else {
      onOpenApp(appId);
    }
  };

  const isGnome = desktopEnv === 'gnome' && !isMobile;
  const isHyprland = desktopEnv === 'hyprland' && !isMobile;

  return (
    <div
      className={`
        ${isMobile
          ? 'relative flex justify-center px-4 py-2 border-t border-cachy-border/15 bg-cachy-base/90 backdrop-blur-lg z-40'
          : isGnome
            ? 'absolute left-3 top-1/2 -translate-y-1/2 flex flex-col justify-center z-40'
            : 'absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center z-40'
        }
      `}
    >
      <motion.div
        initial={{ y: isGnome ? 0 : 24, x: isGnome ? -24 : 0, opacity: 0 }}
        animate={{ y: 0, x: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 240, damping: 22, delay: 0.1 }}
        className={`
          flex ${isGnome ? 'flex-col gap-2 p-2.5 rounded-2xl' : 'items-end gap-2 px-4 py-2'}
          ${!isMobile
            ? isHyprland
              ? 'bg-cachy-base/80 backdrop-blur-md border border-cachy-cyan/40 rounded-xl shadow-lg'
              : 'dock-panel shadow-cachy-lg'
            : ''
          }
        `}
      >
        {appDefinitions.map((app) => {
          const win = windows.find((w) => w.appId === app.id);
          const isOpen = !!win?.isOpen;
          const isActive = isMobile
            ? activeAppId === app.id
            : isOpen && !win?.isMinimized;

          return (
            <DockIcon
              key={app.id}
              app={app}
              isOpen={isOpen}
              isActive={isActive}
              onClick={() => handleClick(app.id)}
              isVertical={isGnome}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
