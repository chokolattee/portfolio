# Portfolio 🐧

A highly interactive, richly animated developer portfolio modeled after the **CachyOS KDE Plasma Desktop Environment** — built with Astro, React, Framer Motion, and Tailwind CSS.

---

## ⚡ Quick Start

### 1. Prerequisites

- **Node.js** ≥ 18.17  
- **pnpm** ≥ 8 (or npm / yarn)

### 2. Install dependencies

```bash
# In the project root (portfolio/ or portfolio/)
pnpm install
# or
npm install
```

### 3. Start development server

```bash
pnpm dev
# or
npm run dev
```

Then open **http://localhost:4321** in your browser.

### 4. Build for production

```bash
pnpm build
pnpm preview  # preview the production build locally
```

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg              # Hexagonal CachyOS emblem
│   └── resume.pdf               # ⚠️  Replace with your actual resume!
├── src/
│   ├── components/
│   │   ├── desktop/
│   │   │   ├── DesktopWorkspace.tsx   # Main window manager + mobile shell
│   │   │   ├── DesktopWindow.tsx      # Draggable KDE-style window wrapper
│   │   │   ├── DesktopIcons.tsx       # Desktop shortcut grid
│   │   │   ├── TopBar.tsx             # Waybar-style top panel + clock
│   │   │   └── BottomDock.tsx         # Animated spring-magnification dock
│   │   └── apps/
│   │       ├── KonsoleApp.tsx         # Fish shell terminal + command pills
│   │       ├── CachyHelloApp.tsx      # Welcome screen + bio
│   │       ├── ProjectsApp.tsx          # Package manager project showcase
│   │       ├── FilesApp.tsx         # File manager resume/dotfiles
│   │       └── SkillsApp.tsx            # System monitor skills visualizer
│   ├── data/
│   │   ├── portfolioData.ts     # ✏️  Edit this to personalize everything
│   │   └── terminalCommands.ts  # Terminal command definitions + ASCII art
│   ├── types/
│   │   └── desktop.ts           # TypeScript interfaces
│   ├── styles/
│   │   └── global.css           # CachyOS tokens, scrollbars, window chrome
│   ├── layouts/
│   │   └── BaseLayout.astro     # HTML shell with SEO + font imports
│   └── pages/
│       └── index.astro          # Entry page
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## ✏️ Personalizing the Portfolio

**Edit a single file:** [`src/data/portfolioData.ts`](src/data/portfolioData.ts)

It contains:

| Export | What it controls |
|--------|-----------------|
| `bio` | Name, title, location, links, summary |
| `projects` | Portfolio projects shown in Projects (package manager) |
| `skills` | Skill levels shown as gauges in Skills++ |
| `fileTree` | Files/folders shown in Files file manager |
| `appDefinitions` | App labels, icons, default window sizes |

```ts
// Example: add a project
export const projects: PortfolioProject[] = [
  {
    id: 'my-project',
    name: 'my-project',
    repo: 'cachyos',
    version: '1.0.0',
    description: 'Short description shown in package list',
    longDescription: 'Full description shown in the install modal...',
    tags: ['rust', 'wasm'],
    url: 'https://github.com/you/my-project',
    cloneUrl: 'git clone https://github.com/you/my-project',
    status: 'installed',
    stars: 500,
  },
];
```

---

## 🎨 Theming

All design tokens live in [`tailwind.config.mjs`](tailwind.config.mjs) under the `cachy.*` color namespace and in [`src/styles/global.css`](src/styles/global.css) as CSS custom properties.

| Token | Value | Usage |
|-------|-------|-------|
| `--cachy-base` | `#0b1116` | Desktop wallpaper background |
| `--cachy-surface` | `#111921` | Window backgrounds |
| `--cachy-teal` | `#00d4aa` | Accent, borders, gauges |
| `--cachy-cyan` | `#0ea5e9` | Secondary accent |

---

## 📱 Mobile Responsive

On screens **< 768px**, the desktop workspace automatically switches to a **touch-friendly mobile shell**:

- Full-screen app views instead of floating windows
- Bottom dock becomes a tab switcher
- Icon grid for launching apps
- Swipe-friendly transitions via Framer Motion

---

## ⌨️ Terminal Commands

The Konsole terminal supports these interactive commands (via pills or typing):

| Command | Output |
|---------|--------|
| `help` | Available command list |
| `whoami` | Developer bio |
| `projects` | Project listing |
| `skills` | Tech stack summary |
| `neofetch` | System info + ASCII art |
| `pacman -Syu` | Animated package update |
| `git log` | Recent commit history |
| `clear` | Clear terminal |

Add custom commands in [`src/data/terminalCommands.ts`](src/data/terminalCommands.ts).

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Astro](https://astro.build) 4.x with React islands |
| UI | [React](https://react.dev) 18 + TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com) 3 |
| Animation | [Framer Motion](https://www.framer.com/motion/) 11 |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Inter + JetBrains Mono (Google Fonts) |

---

## 🚀 Deployment

The site is a fully static export — deploy to any CDN:

```bash
# Netlify
netlify deploy --prod --dir=dist

# Vercel
vercel --prod

# GitHub Pages (gh-pages branch)
gh-pages -d dist
```

---

## 📄 License

MIT — feel free to fork, customize, and use for your own portfolio!
