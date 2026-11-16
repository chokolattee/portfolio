export type AppId =
  | 'konsole'
  | 'cachyhello'
  | 'cachy-hello'
  | 'Projects'
  | 'Files'
  | 'Skills'
  | 'appearance'
  | 'settings';

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
}

export interface AppDefinition {
  id: AppId;
  label: string;
  icon: string;
  description: string;
  defaultSize: { width: number; height: number };
  defaultPosition: { x: number; y: number };
}

export type WallpaperId =
  | 'cachy-matrix'
  | 'bore-aurora'
  | 'cyber-hex'
  | 'wayland-minimal'
  | 'catppuccin-night'
  | 'custom';

export type DesktopEnvironment = 'kde' | 'hyprland' | 'gnome' | 'xfce';

export interface DesktopEnvConfig {
  id: DesktopEnvironment;
  name: string;
  tagline: string;
  badge: string;
  wm: string;
}

export interface Wallpaper {
  id: WallpaperId;
  name: string;
  description: string;
  style: React.CSSProperties;
  previewBg: string;
}

export interface PortfolioProject {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  tags: string[];           // tech stack / deps
  url: string;
  cloneUrl: string;
  status: 'ongoing' | 'completed' | 'coursework';
  liveUrl?: string;
}

export interface Skill {
  name: string;
  level: number;            // 0–100
  category: 'languages' | 'frameworks' | 'cloud' | 'systems' | 'tools';
  color: string;
}

export interface TechnicalSkillGroup {
  category: string;
  items: { name: string; proficiency?: number; highlight?: boolean; desc?: string }[];
}

export interface SoftSkill {
  name: string;
  description: string;
  icon: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'pdf' | 'config' | 'image' | 'text';
  children?: FileNode[];
  content?: string;
  downloadUrl?: string;
  size?: string;
  modified?: string;
}

export interface TerminalCommand {
  command: string;
  output: string | (() => string);
}
