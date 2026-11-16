import type {
  PortfolioProject,
  Skill,
  FileNode,
  AppDefinition,
  TechnicalSkillGroup,
  SoftSkill,
} from '@/types/desktop';

//Personal Info
export const bio = {
  name: 'Mary Pauline Calungsod',
  handle: 'choko',
  title: '4th Year IT Student — Aspiring Full Stack Developer',
  location: 'Taguig City, Metro Manila',
  email: 'calungsod.marypauline@gmail.com',
  phone: '+63 9218255596',
  github: 'https://github.com/chokolattee',
  linkedin: 'https://www.linkedin.com/in/mary-pauline-calungsod-1300623b4/',
  website: 'https://github.com/chokolattee',
  avatar: '/avatar.jpg',
  tagline: 'Our Future Is Loading... 100%.',
  summary: `Information Technology undergraduate with hands-on experience in developing web and mobile applications, backend services, database-driven systems, and machine learning-based applications through academic projects. Demonstrates leadership, analytical thinking, and teamwork skills, with experience coordinating project development and implementing technical solutions. Seeking an IT internship to apply technical knowledge and contribute to real-world software development projects.`,
  experience: '4th Year Student',
  openSource: 'Academic Projects',
  kernelPatches: 'Internship Ready',
};

//APPS
export const appDefinitions: AppDefinition[] = [
  {
    id: 'cachyhello',
    label: 'About Me',
    icon: '🐧',
    description: 'Welcome screen & developer bio',
    defaultSize: { width: 680, height: 520 },
    defaultPosition: { x: 80, y: 60 },
  },
  {
    id: 'konsole',
    label: 'Konsole',
    icon: '⬛',
    description: 'Fish shell & terminal',
    defaultSize: { width: 760, height: 500 },
    defaultPosition: { x: 140, y: 100 },
  },
  {
    id: 'Projects',
    label: 'Projects',
    icon: '📦',
    description: 'Package manager — Projects',
    defaultSize: { width: 820, height: 580 },
    defaultPosition: { x: 180, y: 80 },
  },
  {
    id: 'Files',
    label: 'Files',
    icon: '🗂️',
    description: 'File manager — Resume & Docs',
    defaultSize: { width: 780, height: 540 },
    defaultPosition: { x: 100, y: 120 },
  },
  {
    id: 'Skills',
    label: 'Skills++',
    icon: '📊',
    description: 'System monitor — Skills',
    defaultSize: { width: 800, height: 560 },
    defaultPosition: { x: 160, y: 90 },
  },
  {
    id: 'appearance',
    label: 'Wallpaper & Theme',
    icon: '🎨',
    description: 'Desktop wallpapers & appearance presets',
    defaultSize: { width: 720, height: 490 },
    defaultPosition: { x: 220, y: 110 },
  },
];

// Projects
export const projects: PortfolioProject[] = [
  {
    id: 'milklink',
    name: 'milklink',
    description: 'Pasig City Human Milk Banking Platform — capstone project (ongoing)',
    longDescription: `Capstone project, led as Project Leader. A digital human milk banking platform
for donor management, milk collection, inventory tracking, and distribution.
Built with Flutter/Dart for the mobile app and Node.js/Express with MongoDB (Mongoose) for the backend.`,
    tags: ['flutter', 'dart', 'node.js', 'express', 'mongodb', 'mongoose'],
    url: 'https://github.com/chokolattee/MilkLink',
    cloneUrl: 'git clone https://github.com/chokolattee/MilkLink',
    status: 'ongoing',
  },
  {
    id: 'avocare',
    name: 'avocare',
    description: 'Avocado ripeness classification and pest detection using machine learning',
    longDescription: `Led as Project Leader. An image-based mobile application that classifies
avocado ripeness and detects pests using machine learning. Built with React Native (Expo) and TypeScript,
with a Python ML pipeline, Roboflow for dataset and model work, and MongoDB for storage.`,
    tags: ['python', 'react-native', 'expo', 'typescript', 'mongodb', 'roboflow'],
    url: 'https://github.com/chokolattee/AvoCare-python',
    cloneUrl: 'git clone https://github.com/chokolattee/AvoCare-python',
    status: 'completed',
  },
  {
    id: 'eduportal',
    name: 'eduportal',
    description: 'Learning management system — courses, activities, and student management',
    longDescription: `A learning management platform for course access, educational activities,
and student management. Built with Node.js, React Native, and MongoDB, with AWS file storage.
`,
    tags: ['node.js', 'react-native', 'mongodb', 'aws-s3'],
    url: 'https://github.com/chokolattee/eduportal',
    cloneUrl: 'git clone https://github.com/chokolattee/eduportal',
    status: 'completed',
    liveUrl: 'https://eduportal-lms.vercel.app/',
  },
  {
    id: 'pitwall',
    name: 'pitwall',
    description: 'F1 merchandise e-commerce — mobile version of FormulaHub',
    longDescription: `Mobile version of FormulaHub. An e-commerce app for F1 merchandise
built on the MERN stack with React Native and Expo.`,
    tags: ['mongodb', 'express', 'react-native', 'node.js', 'expo'],
    url: 'https://github.com/chokolattee/PitWall-mobile',
    cloneUrl: 'git clone https://github.com/chokolattee/PitWall-mobile',
    status: 'completed',
  },
  {
    id: 'formulahub',
    name: 'formulahub',
    description: 'F1 merchandise e-commerce web app — MERN stack',
    longDescription: `An e-commerce web application for F1 merchandise built on the MERN stack
(MongoDB, Express, React, Node.js). Mobile counterpart: PitWall.`,
    tags: ['mongodb', 'express', 'react', 'node.js'],
    url: 'https://github.com/chokolattee/Formula-Hub',
    cloneUrl: 'git clone https://github.com/chokolattee/Formula-Hub',
    status: 'completed',
  },
  {
    id: 'squishit',
    name: 'squishit',
    description: 'Teddy bear and plushie e-commerce store (2025)',
    longDescription: `An e-commerce web application for selling teddy bears and plushies,
built with Laravel and PHP.`,
    tags: ['php', 'laravel'],
    url: 'https://github.com/chokolattee/SquishIT',
    cloneUrl: 'git clone https://github.com/chokolattee/SquishIT',
    status: 'completed',
  },
  {
    id: 'furcare-hub',
    name: 'furcare-hub',
    description: 'Pet drop-off appointment booking system (2025)',
    longDescription: `An appointment booking system for pet owners who leave their pets in a care
facility. Built with PHP, JavaScript, HTML, and CSS.`,
    tags: ['php', 'javascript', 'html', 'css'],
    url: 'https://github.com/chokolattee/FurCareHub',
    cloneUrl: 'git clone https://github.com/chokolattee/FurCareHub',
    status: 'completed',
  },
  {
    id: 'bunbunthreads',
    name: 'bunbunthreads',
    description: 'Crochet products e-commerce site',
    longDescription: `An e-commerce site for selling crochet products,
built with JavaScript, HTML, and CSS.`,
    tags: ['javascript', 'html', 'css'],
    url: 'https://github.com/chokolattee/BunBunThreads2',
    cloneUrl: 'git clone https://github.com/chokolattee/BunBunThreads2',
    status: 'completed',
  },
  {
    id: 'kpopstore',
    name: 'kpopstore',
    description: 'K-pop merchandise e-commerce site (2024)',
    longDescription: `An e-commerce site for K-pop merchandise, built with PHP, HTML, and CSS
on a local XAMPP server.`,
    tags: ['php', 'html', 'css', 'xampp'],
    url: 'https://github.com/chokolattee/kpopstore',
    cloneUrl: 'git clone https://github.com/chokolattee/kpopstore',
    status: 'completed',
  },
  {
    id: 'multimedia-portfolio',
    name: 'multimedia-portfolio',
    description: 'Rotoscope and 3D rendering showcase — Blender, Python, After Effects',
    longDescription: `A multimedia portfolio about rotoscoping and 3D rendering, made with Blender,
Python, and Adobe After Effects.`,
    tags: ['blender', 'python', 'after-effects', 'github-pages'],
    url: 'https://github.com/chokolattee/MultimediaPortfolio',
    cloneUrl: 'git clone https://github.com/chokolattee/MultimediaPortfolio',
    status: 'coursework',
    liveUrl: 'https://chokolattee.github.io/MultimediaPortfolio/',
  },
  {
    id: 'os-website',
    name: 'os-website',
    description: 'Operating Systems course site — Windows OS installation, configuration, and management guide',
    longDescription: `Operating Systems course website: a guide to Windows OS installation,
configuration, and management. Includes hands-on labs covering key OS concepts, step-by-step video
demonstrations of Windows installations, and a final case study on system setup, user management, and security.`,
    tags: ['windows', 'operating-systems', 'github-pages'],
    url: 'https://github.com/chokolattee/OSWebsite',
    cloneUrl: 'git clone https://github.com/chokolattee/OSWebsite',
    status: 'coursework',
    liveUrl: 'https://chokolattee.github.io/OSWebsite/',
  },
];

// ─── TECHNICAL SKILL GROUPS ──────────────────────────────────────────────────
export const technicalSkillGroups: TechnicalSkillGroup[] = [
  {
    category: 'Programming Languages',
    items: [
      { name: 'PHP', proficiency: 86, highlight: true, desc: 'Backend APIs, Laravel, XAMPP, full-stack web applications' },
      { name: 'JavaScript', proficiency: 90, highlight: true, desc: 'Modern ES6+, DOM manipulation, asynchronous programming, Node' },
      { name: 'TypeScript', proficiency: 82, highlight: true, desc: 'Strict type safety, interfaces, full-stack architecture' },
      { name: 'Python', proficiency: 80, highlight: false, desc: 'Scripting, machine learning, dataset prep, computer vision' },
      { name: 'Dart', proficiency: 78, highlight: false, desc: 'Cross-platform mobile apps with Flutter' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    items: [
      { name: 'React', proficiency: 88, highlight: true, desc: 'Component architecture, hooks, state management, SPA' },
      { name: 'React Native', proficiency: 82, highlight: true, desc: 'Cross-platform mobile apps for iOS and Android' },
      { name: 'Expo', proficiency: 84, highlight: false, desc: 'Rapid React Native mobile development and deployment' },
      { name: 'Flutter', proficiency: 80, highlight: false, desc: 'High-performance cross-platform mobile UI' },
      { name: 'Laravel', proficiency: 85, highlight: true, desc: 'MVC backend, Eloquent ORM, Sanctum auth, REST APIs' },
      { name: 'Node.js / Express', proficiency: 82, highlight: false, desc: 'Server-side runtime, Express RESTful services, middleware' },
      { name: 'Bootstrap', proficiency: 85, highlight: false, desc: 'Responsive grid, UI utility styling' },
      { name: 'Mongoose', proficiency: 78, highlight: false, desc: 'MongoDB schema modeling, validation, aggregation' },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MySQL', proficiency: 88, highlight: true, desc: 'Relational schema design, complex joins, indexing, normalization' },
      { name: 'MongoDB', proficiency: 80, highlight: true, desc: 'NoSQL document storage, aggregation pipelines, flexible schemas' },
    ],
  },
  {
    category: 'Machine Learning',
    items: [
      {
        name: 'Image Classification',
        proficiency: 78,
        highlight: true,
        desc: 'Deep learning models for visual feature extraction and object categorization',
      },
      {
        name: 'Pest Detection',
        proficiency: 82,
        highlight: true,
        desc: 'Custom object detection pipelines trained for agricultural pest identification',
      },
      {
        name: 'Dataset Annotation & Prep (Roboflow & Python)',
        proficiency: 85,
        highlight: false,
        desc: 'Bounding box annotation, data augmentation, preprocessing, Python scripts',
      },
    ],
  },
  {
    category: 'Tools & Platforms',
    items: [
      { name: 'Git', proficiency: 90, highlight: true, desc: 'Version control, branch management, merge conflict resolution' },
      { name: 'GitHub', proficiency: 88, highlight: true, desc: 'Pull requests, project management, GitHub Pages, CI/CD' },
      { name: 'Insomnia', proficiency: 86, highlight: false, desc: 'REST API testing, payload verification, environment configs' },
      { name: 'Visual Studio Code', proficiency: 92, highlight: false, desc: 'Primary development environment, extensions, debugging' },
      { name: 'Android Studio', proficiency: 76, highlight: false, desc: 'Android emulators, Gradle builds, mobile debugging' },
    ],
  },
  {
    category: 'Technical Concepts',
    items: [
      { name: 'REST API Integration', proficiency: 90, highlight: true, desc: 'Designing & consuming RESTful endpoints with status codes & JSON' },
      { name: 'CRUD Operations', proficiency: 92, highlight: true, desc: 'Full lifecycle Create-Read-Update-Delete database transactions' },
      { name: 'Database Design', proficiency: 86, highlight: true, desc: 'ER diagrams, relational normalization, schema optimization' },
      { name: 'Full-Stack Development', proficiency: 88, highlight: true, desc: 'End-to-end frontend UI to backend server and database layer' },
      { name: 'Cross-Platform App Development', proficiency: 84, highlight: true, desc: 'Single codebase targeting Android and Web using modern frameworks' },
    ],
  },
];

// ─── SOFT SKILLS ─────────────────────────────────────────────────────────────
export const softSkills: SoftSkill[] = [
  {
    name: 'Leadership',
    description: 'Guiding cross-functional student teams, setting milestones, and unblocking development bottlenecks.',
    icon: '👑',
  },
  {
    name: 'Project Management',
    description: 'Breaking down requirements into deliverables, tracking sprints, and maintaining technical roadmap.',
    icon: '📋',
  },
  {
    name: 'Team Coordination',
    description: 'Fostering collaborative team communication, aligning Git workflows, and conducting peer code reviews.',
    icon: '🤝',
  },
  {
    name: 'Communication',
    description: 'Clearly articulating technical architectures, documenting API specifications, and presenting project demos.',
    icon: '💬',
  },
  {
    name: 'Adaptability',
    description: 'Swiftly learning and applying new stacks, pivoting frameworks when requirements shift.',
    icon: '⚡',
  },
  {
    name: 'Time Management',
    description: 'Balancing full-time academic coursework alongside concurrent client and capstone application builds.',
    icon: '⏱️',
  },
];

// ─── SKILLS (Legacy / Gauge overview) ──────────────────────────────────────────
export const skills: Skill[] = [
  // Languages
  { name: 'JavaScript', level: 90, category: 'languages', color: '#f9e2af' },
  { name: 'PHP', level: 86, category: 'languages', color: '#a78bfa' },
  { name: 'Python', level: 80, category: 'languages', color: '#0ea5e9' },
  { name: 'Dart', level: 78, category: 'languages', color: '#00d4aa' },
  { name: 'TypeScript', level: 82, category: 'languages', color: '#0ea5e9' },

  // Frameworks
  { name: 'React', level: 88, category: 'frameworks', color: '#0ea5e9' },
  { name: 'React Native', level: 82, category: 'frameworks', color: '#00d4aa' },
  { name: 'Laravel', level: 85, category: 'frameworks', color: '#f38ba8' },
  { name: 'Flutter', level: 80, category: 'frameworks', color: '#00d4aa' },
  { name: 'Node / Express', level: 82, category: 'frameworks', color: '#a78bfa' },
  { name: 'Expo', level: 84, category: 'frameworks', color: '#fab387' },

  // Systems / Databases
  { name: 'MySQL', level: 88, category: 'systems', color: '#0ea5e9' },
  { name: 'MongoDB', level: 80, category: 'systems', color: '#00d4aa' },
  { name: 'Mongoose', level: 78, category: 'systems', color: '#fab387' },
  { name: 'REST API Design', level: 90, category: 'systems', color: '#a78bfa' },

  // Tools & ML
  { name: 'Git & GitHub', level: 90, category: 'tools', color: '#f38ba8' },
  { name: 'VS Code', level: 92, category: 'tools', color: '#0ea5e9' },
  { name: 'Android Studio', level: 76, category: 'tools', color: '#00d4aa' },
  { name: 'Insomnia', level: 86, category: 'tools', color: '#a78bfa' },
  { name: 'Roboflow / ML Prep', level: 85, category: 'tools', color: '#f9e2af' },
];

// ─── Files FILE TREE ────────────────────────────────────────────────────────
export const fileTree: FileNode[] = [
  {
    id: 'home',
    name: 'Home',
    type: 'folder',
    children: [
      {
        id: 'resume',
        name: 'Resume.pdf',
        type: 'pdf',
        modified: '2026-11-01',
        size: '148 KB',
        downloadUrl: '/Resume.pdf',
      },
    ],
  },
  {
    id: 'dotfiles',
    name: 'Dotfiles',
    type: 'folder',
    children: [
      {
        id: 'vscode-settings',
        name: 'settings.json',
        type: 'config',
        modified: '2026-11-12',
        size: '2.3 KB',
        content: `// VS Code settings.json — @choko
{
  "editor.fontSize": 14,
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', monospace",
  "editor.fontLigatures": true,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.bracketPairColorization.enabled": true,
  "editor.inlineSuggest.enabled": true,
  "workbench.colorTheme": "Catppuccin Mocha",
  "workbench.iconTheme": "catppuccin-mocha",
  "terminal.integrated.fontFamily": "'JetBrains Mono'",

  // Extensions I use daily
  // - Prettier, ESLint, Tailwind IntelliSense
  // - PHP Intelephense, Laravel Artisan
  // - Flutter, Dart
  // - Python, Pylance
  // - Thunder Client (like Postman but inside VSCode)
  // - GitLens, Git Graph

  "prettier.singleQuote": true,
  "prettier.semi": true,
  "emmet.includeLanguages": { "blade": "html" }
}
`,
      },
      {
        id: 'git-config',
        name: '.gitconfig',
        type: 'config',
        modified: '2026-10-01',
        size: '0.8 KB',
        content: `# ~/.gitconfig
[user]
  name  = Mary Pauline Calungsod
  email = calungsod.marypauline@gmail.com

[core]
  autocrlf = input
  editor   = code --wait

[alias]
  st  = status
  co  = checkout
  br  = branch
  lg  = log --oneline --graph --decorate --all
  aa  = add --all
  cm  = commit -m
  ph  = push origin HEAD
  pl  = pull --rebase

[pull]
  rebase = true
`,
      },
    ],
  },
  {
    id: 'certs',
    name: 'Certificates',
    type: 'folder',
    children: [],
  },
];
