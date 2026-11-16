import type { Wallpaper, DesktopEnvConfig } from '@/types/desktop';

export const desktopEnvironments: DesktopEnvConfig[] = [
  {
    id: 'kde',
    name: 'KDE Plasma',
    tagline: 'Waybar top status + floating magnification bottom dock',
    badge: 'KWin Wayland',
    wm: 'KWin',
  },
  {
    id: 'hyprland',
    name: 'Hyprland',
    tagline: 'Modern dynamic tiling compositor with cyan borders',
    badge: 'Hyprland Wayland',
    wm: 'Hyprland',
  },
  {
    id: 'gnome',
    name: 'GNOME 46',
    tagline: 'Top system panel with left vertical dash dock',
    badge: 'Mutter Wayland',
    wm: 'Mutter',
  },
  {
    id: 'xfce',
    name: 'XFCE Classic',
    tagline: 'Lightweight desktop with bottom panel taskbar',
    badge: 'Xfwm4',
    wm: 'Xfwm4',
  },
];

export const wallpapers: Wallpaper[] = [
  {
    id: 'cachy-matrix',
    name: 'CachyOS Default Matrix',
    description: 'Deep slate-navy with emerald-teal & cyan radial glows and grid lines',
    previewBg:
      'radial-gradient(circle at 75% 20%, #00d4aa 0%, transparent 50%), radial-gradient(circle at 20% 80%, #0ea5e9 0%, transparent 45%), #0b1116',
    style: {
      backgroundColor: '#0b1116',
      backgroundImage: `
        radial-gradient(ellipse 65% 45% at 75% 18%, rgba(0, 212, 170, 0.14) 0%, transparent 65%),
        radial-gradient(ellipse 55% 40% at 20% 82%, rgba(14, 165, 233, 0.10) 0%, transparent 60%),
        linear-gradient(rgba(0, 212, 170, 0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0, 212, 170, 0.04) 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 100% 100%, 48px 48px, 48px 48px',
    },
  },
  {
    id: 'bore-aurora',
    name: 'BORE Kernel Aurora',
    description: 'Flowing northern-lights mesh gradient in teal, emerald, and ocean blue',
    previewBg:
      'linear-gradient(135deg, #022c22 0%, #047857 40%, #0284c7 75%, #020617 100%)',
    style: {
      backgroundColor: '#040d12',
      backgroundImage: `
        radial-gradient(ellipse 85% 55% at 50% -10%, rgba(0, 212, 170, 0.32) 0%, transparent 70%),
        radial-gradient(ellipse 65% 45% at 85% 60%, rgba(14, 165, 233, 0.22) 0%, transparent 65%),
        radial-gradient(ellipse 50% 50% at 15% 50%, rgba(16, 185, 129, 0.20) 0%, transparent 60%),
        linear-gradient(180deg, rgba(2, 6, 23, 0.3) 0%, rgba(4, 13, 18, 0.85) 100%)
      `,
      backgroundSize: '100% 100%',
    },
  },
  {
    id: 'cyber-hex',
    name: 'Arch Cyber Hexagon',
    description: 'Dark carbon base with subtle glowing hexagonal CachyOS geometry',
    previewBg:
      'radial-gradient(circle at 50% 50%, #00d4aa 0%, #080f14 70%)',
    style: {
      backgroundColor: '#070b0e',
      backgroundImage: `
        radial-gradient(circle at 50% 40%, rgba(0, 212, 170, 0.16) 0%, transparent 60%),
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='97' viewBox='0 0 56 97'%3E%3Cg fill='none' stroke='%2300d4aa' stroke-width='1' stroke-opacity='0.08'%3E%3Cpath d='M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z'/%3E%3Cpath d='M28 48 L56 64 L56 96 L28 112 L0 96 L0 64 Z'/%3E%3C/g%3E%3C/svg%3E"),
        radial-gradient(circle at 80% 90%, rgba(14, 165, 233, 0.12) 0%, transparent 50%)
      `,
      backgroundSize: '100% 100%, 56px 97px, 100% 100%',
    },
  },
  {
    id: 'wayland-minimal',
    name: 'Nordic Wayland Minimal',
    description: 'Ultra-minimal dark slate with soft ambient cyan spotlight',
    previewBg:
      'radial-gradient(circle at 50% 15%, #0ea5e9 0%, #090e17 65%)',
    style: {
      backgroundColor: '#080d14',
      backgroundImage: `
        radial-gradient(ellipse 60% 45% at 50% 12%, rgba(14, 165, 233, 0.18) 0%, transparent 70%),
        radial-gradient(ellipse 40% 30% at 80% 75%, rgba(0, 212, 170, 0.08) 0%, transparent 60%),
        linear-gradient(180deg, #090e17 0%, #05080d 100%)
      `,
      backgroundSize: '100% 100%',
    },
  },
  {
    id: 'catppuccin-night',
    name: 'Dracula / Catppuccin Night',
    description: 'Deep midnight violet-slate with subtle teal and magenta accents',
    previewBg:
      'radial-gradient(circle at 25% 25%, #c084fc 0%, #11111b 50%), radial-gradient(circle at 80% 80%, #00d4aa 0%, #11111b 50%)',
    style: {
      backgroundColor: '#11111b',
      backgroundImage: `
        radial-gradient(ellipse 55% 45% at 20% 25%, rgba(192, 132, 252, 0.16) 0%, transparent 60%),
        radial-gradient(ellipse 50% 40% at 80% 75%, rgba(0, 212, 170, 0.14) 0%, transparent 60%),
        radial-gradient(ellipse 45% 35% at 50% 50%, rgba(243, 139, 168, 0.08) 0%, transparent 50%),
        linear-gradient(180deg, #11111b 0%, #0b0b12 100%)
      `,
      backgroundSize: '100% 100%',
    },
  },
];

export const DEFAULT_WALLPAPER_ID = 'cachy-matrix';
