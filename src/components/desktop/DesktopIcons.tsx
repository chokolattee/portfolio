import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { appDefinitions } from '@/data/portfolioData';
import type { AppId } from '@/types/desktop';

interface Props {
  onOpenApp: (id: AppId) => void;
  mobile?: boolean;
}

export default function DesktopIcons({ onOpenApp, mobile }: Props) {
  const [selectedId, setSelectedId] = useState<AppId | null>(null);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.05 } },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 280, damping: 22 },
    },
  };

  // Mobile layout
  if (mobile) {
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-3 gap-3.5 p-2 w-full max-w-sm pointer-events-auto"
      >
        {appDefinitions.map((app) => (
          <motion.button
            key={app.id}
            variants={item}
            onClick={() => onOpenApp(app.id)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.94 }}
            className="flex flex-col items-center gap-2 p-3 rounded-xl glass border border-cachy-border/20
                       text-cachy-text hover:border-cachy-teal/50 hover:bg-cachy-teal/10 transition-colors"
          >
            <span className="text-3xl drop-shadow">{app.icon}</span>
            <span className="text-[11px] font-medium text-center leading-tight line-clamp-2">
              {app.label}
            </span>
          </motion.button>
        ))}
      </motion.div>
    );
  }

  // Desktop layout (z-10, pointer-events-auto, click/dblclick handling)
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="absolute top-5 left-5 flex flex-col gap-2.5 z-10 pointer-events-auto"
      onClick={(e) => {
        // Deselect if clicking the container backdrop
        if (e.target === e.currentTarget) {
          setSelectedId(null);
        }
      }}
    >
      {appDefinitions.map((app) => {
        const isSelected = selectedId === app.id;

        return (
          <motion.button
            key={app.id}
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedId(app.id);
              onOpenApp(app.id);
            }}
            onDoubleClick={(e) => {
              e.stopPropagation();
              onOpenApp(app.id);
            }}
            className={`
              flex flex-col items-center gap-1.5 p-2 rounded-xl w-24 text-cachy-text
              transition-all duration-150 group cursor-pointer focus:outline-none select-none
              ${isSelected
                ? 'bg-[#00d4aa]/15 border border-[#00d4aa]/40 shadow-cachy-glow'
                : 'hover:bg-cachy-teal/10 border border-transparent'
              }
            `}
            title={`Click or double-click to open ${app.label}`}
          >
            <span className="text-4xl drop-shadow-md transition-transform group-hover:scale-105">
              {app.icon}
            </span>
            <span
              className={`
                text-[11px] font-medium text-center leading-tight px-1.5 py-0.5 rounded-md
                max-w-full truncate transition-colors font-mono
                ${isSelected
                  ? 'bg-cachy-teal text-cachy-base font-semibold'
                  : 'bg-cachy-base/85 text-cachy-text group-hover:text-cachy-teal'
                }
              `}
            >
              {app.label}
            </span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
