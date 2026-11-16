import React, { useState, useEffect, useRef } from 'react';
import { motion, useDragControls, useMotionValue } from 'framer-motion';
import { X, Minus, Maximize2 } from 'lucide-react';
import type { WindowState } from '@/types/desktop';

interface Props {
  window:     WindowState;
  children:   React.ReactNode;
  onClose:    () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus:    () => void;
  onMove:     (pos: { x: number; y: number }) => void;
  onResize?:  (size: { width: number; height: number }) => void;
}

export default function DesktopWindow({
  window: win,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
}: Props) {
  const dragControls = useDragControls();

  // Track whether a resize is in progress so we can block drag
  const isResizing = useRef(false);

  // Keep local size in sync with prop, but allow smooth live resizing
  const [size, setSize] = useState(win.size);
  const sizeRef = useRef(win.size);
  sizeRef.current = size;

  useEffect(() => {
    setSize(win.size);
  }, [win.size.width, win.size.height]);

  // useMotionValue keeps x/y without fighting animate
  const x = useMotionValue(win.position.x);
  const y = useMotionValue(win.position.y);

  useEffect(() => {
    x.set(win.position.x);
    y.set(win.position.y);
  }, [win.position.x, win.position.y, x, y]);

  // Handle free resizing — capture pointer on the handle element so
  // the outer motion.div never sees it and cannot start a drag.
  const startResize = (
    e: React.PointerEvent,
    direction: 'se' | 'e' | 's'
  ) => {
    e.preventDefault();
    e.stopPropagation();
    // Capture pointer on the handle so pointermove goes directly here
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    isResizing.current = true;
    onFocus();

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = sizeRef.current.width;
    const startHeight = sizeRef.current.height;

    let currentW = startWidth;
    let currentH = startHeight;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      const maxWidth = typeof window !== 'undefined' ? window.innerWidth - 30 : 1600;
      const maxHeight = typeof window !== 'undefined' ? window.innerHeight - 80 : 1200;

      if (direction === 'se' || direction === 'e') {
        currentW = Math.min(maxWidth, Math.max(360, startWidth + deltaX));
      }
      if (direction === 'se' || direction === 's') {
        currentH = Math.min(maxHeight, Math.max(260, startHeight + deltaY));
      }

      setSize({ width: currentW, height: currentH });
    };

    const onPointerUp = () => {
      isResizing.current = false;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      if (onResize) {
        onResize({ width: currentW, height: currentH });
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const sizeStyle = win.isMaximized
    ? { width: '100%', height: '100%', borderRadius: 0, top: 0, left: 0 }
    : { width: size.width, height: size.height };

  return (
    <motion.div
      className="kde-window absolute flex flex-col overflow-hidden group select-none"
      style={{
        x:      win.isMaximized ? 0 : x,
        y:      win.isMaximized ? 0 : y,
        zIndex: win.zIndex,
        ...sizeStyle,
      }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.88, transition: { duration: 0.16 } }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      drag={!win.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        left:   0,
        top:    0,
        right:  typeof window !== 'undefined' ? (window.innerWidth  || 1200) - size.width  : 900,
        bottom: typeof window !== 'undefined' ? (window.innerHeight || 800)  - size.height - 72 : 500,
      }}
      onDragEnd={() => {
        onMove({ x: x.get(), y: y.get() });
      }}
      onPointerDown={(e) => {
        // Block focus / drag start when a resize handle initiated the event
        if (!isResizing.current) onFocus();
      }}
    >
      {/* ── Title bar ─────────────────────────────────────────────────────── */}
      <div
        className="kde-titlebar flex items-center justify-between px-3 py-2 cursor-grab active:cursor-grabbing no-select"
        onPointerDown={(e) => {
          if (!win.isMaximized && !isResizing.current) dragControls.start(e);
        }}
        onDoubleClick={onMaximize}
      >
        {/* Window controls */}
        <div className="flex items-center gap-1.5 group/controls">
          <button
            className="kde-btn-close w-3 h-3 rounded-full transition-all hover:scale-110 focus:outline-none flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
          >
            <X size={6} className="opacity-0 group-hover/controls:opacity-100 transition-opacity text-[#8b0000]" strokeWidth={3} />
          </button>
          <button
            className="kde-btn-minimize w-3 h-3 rounded-full transition-all hover:scale-110 focus:outline-none flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            aria-label="Minimize"
          >
            <Minus size={6} className="opacity-0 group-hover/controls:opacity-100 transition-opacity text-[#5a3e00]" strokeWidth={3} />
          </button>
          <button
            className="kde-btn-maximize w-3 h-3 rounded-full transition-all hover:scale-110 focus:outline-none flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            aria-label="Maximize"
          >
            <Maximize2 size={5} className="opacity-0 group-hover/controls:opacity-100 transition-opacity text-[#004d2e]" strokeWidth={3} />
          </button>
        </div>

        {/* Title */}
        <span className="text-xs font-medium text-cachy-subtext tracking-wide font-mono">
          {win.title}
        </span>

        {/* Right spacer (balances controls) */}
        <div className="w-16" />
      </div>

      {/* ── Content area ──────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-hidden min-h-0 select-text">
        {children}
      </div>

      {/* ── Free Resize Handles (Only when not maximized) ─────────────────── */}
      {!win.isMaximized && (
        <>
          {/* Right edge */}
          <div
            className="absolute top-0 right-0 w-2 h-full cursor-ew-resize hover:bg-cachy-teal/20 transition-colors z-20"
            onPointerDown={(e) => startResize(e, 'e')}
            title="Resize width"
          />
          {/* Bottom edge */}
          <div
            className="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize hover:bg-cachy-teal/20 transition-colors z-20"
            onPointerDown={(e) => startResize(e, 's')}
            title="Resize height"
          />
          {/* Bottom-right corner */}
          <div
            className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize flex items-end justify-end p-0.5 z-30 group/corner hover:bg-cachy-teal/30 rounded-br-lg transition-colors"
            onPointerDown={(e) => startResize(e, 'se')}
            title="Resize window freely"
          >
            <svg
              className="w-2.5 h-2.5 text-cachy-subtext/50 group-hover/corner:text-cachy-teal transition-colors"
              viewBox="0 0 10 10"
              fill="currentColor"
            >
              <path d="M9 1L1 9M9 5L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </>
      )}
    </motion.div>
  );
}
