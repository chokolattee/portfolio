/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cachy: {
          base:    '#0b1116',
          surface: '#111921',
          overlay: '#151f29',
          muted:   '#1e2d3d',
          border:  '#00d4aa',
          teal:    '#00d4aa',
          cyan:    '#0ea5e9',
          text:    '#cdd6f4',
          subtext: '#6e7f8d',
          green:   '#00d4aa',
          blue:    '#0ea5e9',
          purple:  '#a78bfa',
          red:     '#f38ba8',
          yellow:  '#f9e2af',
          orange:  '#fab387',
        },
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'cachy':      '0 0 0 1px rgba(0,212,170,0.25), 0 8px 32px rgba(0,0,0,0.6)',
        'cachy-lg':   '0 0 0 1px rgba(0,212,170,0.35), 0 20px 60px rgba(0,0,0,0.8)',
        'cachy-glow': '0 0 20px rgba(0,212,170,0.3)',
        'cyan-glow':  '0 0 20px rgba(14,165,233,0.3)',
      },
      backgroundImage: {
        'grid-pattern':
          'linear-gradient(rgba(0,212,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.03) 1px, transparent 1px)',
        'radial-teal':
          'radial-gradient(ellipse 60% 40% at 70% 20%, rgba(0,212,170,0.08) 0%, transparent 60%)',
        'radial-cyan':
          'radial-gradient(ellipse 50% 35% at 20% 80%, rgba(14,165,233,0.06) 0%, transparent 55%)',
      },
      backgroundSize: {
        'grid': '48px 48px',
      },
      animation: {
        'pulse-teal':   'pulse-teal 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'blink':        'blink 1s step-end infinite',
        'scan':         'scan 3s linear infinite',
        'float':        'float 6s ease-in-out infinite',
        'glow-pulse':   'glow-pulse 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-teal': {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.5' },
        },
        'blink': {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0' },
        },
        'scan': {
          '0%':   { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 48px' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%,100%': { boxShadow: '0 0 10px rgba(0,212,170,0.2)' },
          '50%':     { boxShadow: '0 0 30px rgba(0,212,170,0.5)' },
        },
      },
    },
  },
  plugins: [],
};
