import { bio, projects, skills } from './portfolioData';

export const CACHY_ASCII = `
  ██████╗ █████╗  ██████╗██╗  ██╗██╗   ██╗ ██████╗ ███████╗
 ██╔════╝██╔══██╗██╔════╝██║  ██║╚██╗ ██╔╝██╔═══██╗██╔════╝
 ██║     ███████║██║     ███████║ ╚████╔╝ ██║   ██║███████╗
 ██║     ██╔══██║██║     ██╔══██║  ╚██╔╝  ██║   ██║╚════██║
 ╚██████╗██║  ██║╚██████╗██║  ██║   ██║   ╚██████╔╝███████║
  ╚═════╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝   ╚═╝    ╚═════╝ ╚══════╝`;

export const FASTFETCH_OUTPUT = `
${CACHY_ASCII}

  \x1b[1;32mOS\x1b[0m:         CachyOS x86_64
  \x1b[1;32mKernel\x1b[0m:     6.18.0-cachyos-bore
  \x1b[1;32mUptime\x1b[0m:     47 days, 6 hours, 12 minutes
  \x1b[1;32mPackages\x1b[0m:   1842 (pacman)
  \x1b[1;32mShell\x1b[0m:      fish 3.7.1
  \x1b[1;32mDisplay\x1b[0m:    2560x1440 @ 165Hz
  \x1b[1;32mWM\x1b[0m:         KWin Wayland
  \x1b[1;32mTheme\x1b[0m:      CachyOS Dark [KDE Plasma]
  \x1b[1;32mIcons\x1b[0m:      Tela Circle
  \x1b[1;32mTerminal\x1b[0m:   Konsole 24.08
  \x1b[1;32mCPU\x1b[0m:        AMD Ryzen 9 7950X3D (32) @ 5.7GHz
  \x1b[1;32mGPU\x1b[0m:        AMD Radeon RX 7900 XTX 24GB
  \x1b[1;32mMemory\x1b[0m:     8.4GiB / 64.0GiB
  \x1b[1;32mDisk\x1b[0m:       /dev/nvme0n1p2  — 2TB Samsung 990 Pro
  \x1b[1;32mScheduler\x1b[0m:  BORE (Burst-Oriented Response Enhancer)
`;

export const commandMap: Record<string, string> = {
  help: `\x1b[1;36mAvailable commands:\x1b[0m
  \x1b[1;32mwhoami\x1b[0m       — developer identity & bio
  \x1b[1;32mprojects\x1b[0m     — list portfolio projects
  \x1b[1;32mskills\x1b[0m       — tech stack overview
  \x1b[1;32mcontact\x1b[0m      — contact information
  \x1b[1;32mclear\x1b[0m        — clear terminal`,

  whoami: `\x1b[1;32m${bio.name}\x1b[0m — @${bio.handle}
  Title:      ${bio.title}
  Location:   ${bio.location}
  Experience: ${bio.experience}
  GitHub:     ${bio.github}
  Contact:    ${bio.phone}

  "${bio.tagline}"`,

  projects: `\x1b[1;36mPortfolio Projects:\x1b[0m
${projects
      .map(
        (p) =>
          `  \x1b[1;32m${p.name}\x1b[0m
    ${p.description}
    Tags: ${p.tags.join(', ')}`
      )
      .join('\n\n')}`,

  skills: `\x1b[1;36mTechnical Skills:\x1b[0m

  \x1b[1;33mLanguages:\x1b[0m    PHP, JavaScript, TypeScript, Python, Dart
  \x1b[1;33mFrameworks:\x1b[0m   React, React Native, Expo, Flutter, Laravel, Node.js/Express, Bootstrap, Mongoose
  \x1b[1;33mDatabases:\x1b[0m    MySQL, MongoDB
  \x1b[1;33mMachine Learning:\x1b[0m Image classification, pest detection, dataset annotation & prep (Roboflow, Python)
  \x1b[1;33mTools:\x1b[0m        Git, GitHub, Insomnia, Visual Studio Code, Android Studio
  \x1b[1;33mConcepts:\x1b[0m     REST API Integration, CRUD Operations, Database Design, Full-Stack & Cross-Platform

  \x1b[1;35mSoft Skills:\x1b[0m  Leadership, Project Management, Team Coordination, Communication, Adaptability, Time Management`,

  contact: `\x1b[1;36mContact:\x1b[0m
  \x1b[1;32mEmail\x1b[0m:    ${bio.email}
  \x1b[1;32mContact Number\x1b[0m:   ${bio.phone}
  \x1b[1;32mGitHub\x1b[0m:   ${bio.github}
  \x1b[1;32mLinkedIn\x1b[0m: ${bio.linkedin}`,

  clear: '__CLEAR__',

  ls: `\x1b[1; 34mDocuments /\x1b[0m  \x1b[1; 34mProjects /\x1b[0m  \x1b[1; 34mDotfiles /\x1b[0m  Resume.pdf  README.md`,

  pwd: `/ home / ${bio.handle}`,

  uname: `Linux cachyos 6.18.0 - cachyos - bore #1 SMP PREEMPT_DYNAMIC x86_64 GNU / Linux`,

  date: new Date().toUTCString(),
};
