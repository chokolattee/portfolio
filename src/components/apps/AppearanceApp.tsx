import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Sparkles,
  Monitor,
  Upload,
  Image as ImageIcon,
  Trash2,
  Layers,
  Layout,
  Sliders,
} from 'lucide-react';
import { wallpapers, desktopEnvironments } from '@/data/wallpapers';
import type {
  WallpaperId,
  DesktopEnvironment,
  AppId,
} from '@/types/desktop';

interface Props {
  currentWallpaperId?: WallpaperId;
  customWallpaperDataUrl?: string | null;
  onSelectWallpaper?: (id: WallpaperId) => void;
  onUploadCustomWallpaper?: (dataUrl: string) => void;
  onRemoveCustomWallpaper?: () => void;
  currentDE?: DesktopEnvironment;
  onSelectDE?: (de: DesktopEnvironment) => void;
  onOpenApp?: (id: AppId) => void;
}

export default function AppearanceApp({
  currentWallpaperId = 'cachy-matrix',
  customWallpaperDataUrl = null,
  onSelectWallpaper,
  onUploadCustomWallpaper,
  onRemoveCustomWallpaper,
  currentDE = 'kde',
  onSelectDE,
}: Props) {
  const [activeTab, setActiveTab] = useState<'wallpapers' | 'environments'>(
    'wallpapers'
  );
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle local image upload via FileReader
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please choose a valid image file (PNG, JPG, WebP, SVG).');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image size exceeds 8MB limit.');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUploadCustomWallpaper?.(reader.result);
        onSelectWallpaper?.('custom');
      }
    };
    reader.onerror = () => {
      setUploadError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="h-full flex flex-col p-4 overflow-y-auto bg-cachy-surface/90 text-cachy-text font-sans">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-cachy-border/15 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-cachy-teal/15 border border-cachy-teal/30 flex items-center justify-center text-cachy-teal">
            <Monitor size={18} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-cachy-text font-mono">
              Desktop Appearance & Environment
            </h2>
            <p className="text-[11px] text-cachy-subtext">
              Customize CachyOS wallpapers, upload custom images & switch desktop compositors
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center p-0.5 rounded-lg bg-cachy-base border border-cachy-border/20 text-xs font-mono">
          <button
            onClick={() => setActiveTab('wallpapers')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${activeTab === 'wallpapers'
                ? 'bg-cachy-teal text-cachy-base font-semibold shadow'
                : 'text-cachy-subtext hover:text-cachy-text'
              }`}
          >
            <ImageIcon size={13} />
            <span>Wallpapers</span>
          </button>

          <button
            onClick={() => setActiveTab('environments')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md transition-colors ${activeTab === 'environments'
                ? 'bg-cachy-teal text-cachy-base font-semibold shadow'
                : 'text-cachy-subtext hover:text-cachy-text'
              }`}
          >
            <Layout size={13} />
            <span>Environments ({currentDE.toUpperCase()})</span>
          </button>
        </div>
      </div>

      {/* ── Tab 1: Wallpapers & Upload ───────────────────────────────────────── */}
      {activeTab === 'wallpapers' && (
        <div className="flex flex-col gap-4">
          {/* Custom Image Upload Section */}
          <div className="p-3.5 rounded-xl border border-cachy-border/25 bg-cachy-base/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-16 h-12 rounded-lg border-2 border-dashed border-cachy-teal/50 hover:border-cachy-teal bg-cachy-teal/5 flex flex-col items-center justify-center cursor-pointer transition-colors text-cachy-teal flex-shrink-0"
                title="Click to select image"
              >
                <Upload size={18} />
              </div>

              <div>
                <h3 className="text-xs font-bold text-cachy-text font-mono flex items-center gap-1.5">
                  <span>Custom Image Wallpaper</span>
                  {currentWallpaperId === 'custom' && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] bg-cachy-teal text-cachy-base font-bold">
                      ACTIVE
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-cachy-subtext mt-0.5">
                  Upload an image from your device (PNG, JPG, WebP) to set as desktop wallpaper
                </p>
                {uploadError && (
                  <p className="text-[11px] text-cachy-red font-mono mt-1">
                    {uploadError}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-cachy-teal text-cachy-base font-semibold hover:bg-cachy-teal/90 transition-colors shadow"
              >
                <Upload size={13} />
                <span>Choose Image...</span>
              </button>

              {customWallpaperDataUrl && (
                <>
                  <button
                    type="button"
                    onClick={() => onSelectWallpaper?.('custom')}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono transition-colors ${currentWallpaperId === 'custom'
                        ? 'bg-cachy-teal/20 text-cachy-teal border border-cachy-teal/40'
                        : 'glass text-cachy-text hover:border-cachy-teal/50'
                      }`}
                  >
                    <Check size={12} />
                    <span>Apply</span>
                  </button>

                  <button
                    type="button"
                    onClick={onRemoveCustomWallpaper}
                    className="p-1.5 rounded-lg text-cachy-subtext hover:text-cachy-red hover:bg-cachy-red/10 transition-colors"
                    title="Remove custom wallpaper"
                  >
                    <Trash2 size={14} />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Custom wallpaper thumbnail if exists */}
          {customWallpaperDataUrl && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl border border-cachy-teal/30 bg-cachy-teal/5">
              <div className="w-20 h-12 rounded-lg overflow-hidden border border-cachy-border/30 bg-black flex-shrink-0">
                <img
                  src={customWallpaperDataUrl}
                  alt="Custom preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-cachy-text truncate font-mono">
                  Current Custom Image
                </div>
                <div className="text-[10px] text-cachy-subtext truncate">
                  Loaded into browser memory & ready to display
                </div>
              </div>
              {currentWallpaperId === 'custom' ? (
                <span className="flex items-center gap-1 text-[11px] font-mono text-cachy-teal">
                  <Check size={13} /> Applied
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectWallpaper?.('custom')}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-cachy-teal text-cachy-base font-semibold"
                >
                  Use This
                </button>
              )}
            </div>
          )}

          {/* Section Divider */}
          <div className="flex items-center justify-between text-[11px] font-mono text-cachy-subtext px-1">
            <span>CachyOS Pure CSS Presets (Zero Latency)</span>
            <span>{wallpapers.length} Presets</span>
          </div>

          {/* Built-in Presets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-2">
            {wallpapers.map((wp) => {
              const isActive = currentWallpaperId === wp.id;
              return (
                <motion.div
                  key={wp.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    group relative flex flex-col rounded-xl overflow-hidden border transition-all cursor-pointer
                    ${isActive
                      ? 'border-cachy-teal shadow-cachy-glow bg-cachy-teal/5'
                      : 'border-cachy-border/20 hover:border-cachy-teal/50 bg-cachy-base/60'
                    }
                  `}
                  onClick={() => onSelectWallpaper?.(wp.id)}
                >
                  <div
                    className="relative h-28 w-full overflow-hidden border-b border-cachy-border/15 flex flex-col justify-between p-2"
                    style={wp.style}
                  >
                    <div className="w-full h-1.5 rounded-sm bg-black/40 backdrop-blur-xs flex items-center justify-between px-1">
                      <div className="w-3 h-0.5 rounded-full bg-cachy-teal/70" />
                      <div className="w-2 h-0.5 rounded-full bg-white/40" />
                    </div>

                    <div className="w-16 h-10 rounded border border-cachy-teal/40 bg-cachy-surface/85 shadow-sm p-1 ml-2">
                      <div className="flex gap-0.5 mb-1">
                        <div className="w-1 h-1 rounded-full bg-cachy-red/80" />
                        <div className="w-1 h-1 rounded-full bg-cachy-yellow/80" />
                        <div className="w-1 h-1 rounded-full bg-cachy-teal/80" />
                      </div>
                      <div className="w-10 h-0.5 bg-cachy-teal/40 rounded-full" />
                    </div>

                    {isActive && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-cachy-teal text-cachy-base text-[10px] font-bold font-mono shadow-md"
                      >
                        <Check size={10} strokeWidth={3} /> Active
                      </motion.div>
                    )}
                  </div>

                  <div className="p-3 flex flex-col justify-between flex-1 gap-2">
                    <div>
                      <h3 className="text-xs font-bold text-cachy-text group-hover:text-cachy-teal transition-colors">
                        {wp.name}
                      </h3>
                      <p className="text-[10px] text-cachy-subtext mt-0.5 leading-snug">
                        {wp.description}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectWallpaper?.(wp.id);
                      }}
                      className={`
                        w-full py-1.5 px-2.5 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all
                        ${isActive
                          ? 'bg-cachy-teal/20 text-cachy-teal border border-cachy-teal/40 cursor-default'
                          : 'glass text-cachy-text hover:bg-cachy-teal hover:text-cachy-base hover:border-cachy-teal'
                        }
                      `}
                    >
                      {isActive ? (
                        <>
                          <Check size={12} /> Current Wallpaper
                        </>
                      ) : (
                        <>Apply Wallpaper</>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Tab 2: Desktop Environment Switcher ──────────────────────────────── */}
      {activeTab === 'environments' && (
        <div className="flex flex-col gap-4">
          <div className="p-3 rounded-xl border border-cachy-border/20 bg-cachy-base/40 text-xs">
            <div className="font-bold text-cachy-teal font-mono mb-1 flex items-center gap-1.5">
              <Sliders size={14} />
              <span>Select Arch Linux Desktop Compositor / Shell</span>
            </div>
            <p className="text-cachy-subtext text-[11px] leading-relaxed">
              CachyOS supports multiple desktop environments out of the box. Switching environments immediately adapts the top status bar, dock placement, and window chrome.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {desktopEnvironments.map((de) => {
              const isSelected = currentDE === de.id;
              return (
                <motion.div
                  key={de.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSelectDE?.(de.id)}
                  className={`
                    p-4 rounded-xl border flex flex-col justify-between gap-3 cursor-pointer transition-all
                    ${isSelected
                      ? 'border-cachy-teal shadow-cachy-glow bg-cachy-teal/10'
                      : 'border-cachy-border/20 hover:border-cachy-teal/40 bg-cachy-base/60'
                    }
                  `}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-cachy-text font-mono">
                          {de.name}
                        </h3>
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cachy-teal/15 text-cachy-teal border border-cachy-teal/30">
                          {de.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-cachy-subtext mt-1">
                        {de.tagline}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-cachy-teal text-cachy-base flex items-center justify-center flex-shrink-0 shadow">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* Visual DE Mini Diagram */}
                  <div className="h-16 w-full rounded-lg bg-black/40 border border-cachy-border/15 relative overflow-hidden p-1.5 flex flex-col justify-between">
                    {/* KDE: Top Waybar + Bottom Dock */}
                    {de.id === 'kde' && (
                      <>
                        <div className="w-full h-2 rounded bg-cachy-teal/20 border-b border-cachy-teal/40 flex justify-between px-1 items-center">
                          <div className="w-4 h-1 rounded-full bg-cachy-teal/80" />
                          <div className="w-8 h-1 rounded-full bg-white/30" />
                        </div>
                        <div className="w-24 h-3 mx-auto rounded-full bg-cachy-surface border border-cachy-teal/40 flex items-center justify-around px-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-cachy-teal" />
                          <div className="w-1.5 h-1.5 rounded-full bg-cachy-cyan" />
                          <div className="w-1.5 h-1.5 rounded-full bg-cachy-purple" />
                        </div>
                      </>
                    )}

                    {/* Hyprland: Thin Waybar top + Tiling border windows */}
                    {de.id === 'hyprland' && (
                      <>
                        <div className="w-full h-2 rounded bg-cachy-cyan/20 border-b border-cachy-cyan/40 flex justify-between px-1 items-center">
                          <div className="w-6 h-1 rounded-full bg-cachy-cyan" />
                          <div className="w-10 h-1 rounded-full bg-cachy-teal" />
                        </div>
                        <div className="grid grid-cols-2 gap-1 flex-1 mt-1">
                          <div className="rounded border border-cachy-teal bg-cachy-teal/10 flex items-center justify-center text-[8px] text-cachy-teal font-mono">
                            term
                          </div>
                          <div className="rounded border border-cachy-cyan bg-cachy-cyan/10 flex items-center justify-center text-[8px] text-cachy-cyan font-mono">
                            code
                          </div>
                        </div>
                      </>
                    )}

                    {/* GNOME: Top panel + Left Dash bar */}
                    {de.id === 'gnome' && (
                      <div className="flex flex-col h-full">
                        <div className="w-full h-2 rounded bg-white/10 flex justify-between px-1 items-center mb-1">
                          <div className="w-8 h-1 rounded bg-cachy-teal" />
                          <div className="w-6 h-1 rounded bg-white/40" />
                        </div>
                        <div className="flex-1 flex gap-1">
                          <div className="w-3 h-full rounded bg-cachy-surface border border-white/20 flex flex-col justify-around py-0.5 items-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-cachy-teal" />
                            <div className="w-1.5 h-1.5 rounded-full bg-cachy-cyan" />
                          </div>
                          <div className="flex-1 rounded border border-white/10 bg-white/5" />
                        </div>
                      </div>
                    )}

                    {/* XFCE: Classic bottom taskbar */}
                    {de.id === 'xfce' && (
                      <div className="flex flex-col justify-between h-full">
                        <div className="flex-1 rounded border border-white/10 bg-white/5" />
                        <div className="w-full h-2.5 rounded bg-cachy-surface border-t border-cachy-border/30 flex items-center px-1 gap-1">
                          <div className="w-3 h-1.5 rounded bg-cachy-teal" />
                          <div className="w-6 h-1 rounded bg-white/30" />
                          <div className="w-6 h-1 rounded bg-white/30" />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectDE?.(de.id);
                    }}
                    className={`
                      w-full py-1.5 px-2.5 rounded-lg text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-all
                      ${isSelected
                        ? 'bg-cachy-teal text-cachy-base font-bold shadow'
                        : 'glass text-cachy-text hover:bg-cachy-teal/20 hover:border-cachy-teal'
                      }
                    `}
                  >
                    {isSelected ? (
                      <>
                        <Check size={12} /> Active Environment
                      </>
                    ) : (
                      <>Switch to {de.name}</>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
