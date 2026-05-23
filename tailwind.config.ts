import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,json,md,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Maple Mono', 'LXGW WenKai', 'STKaiti', 'KaiTi', 'serif'],
        mono: ['Maple Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        article: ['Newsreader', 'LXGW WenKai', 'Noto Serif SC', 'serif'],
        'serif-cn': ['Noto Serif SC', 'LXGW WenKai', 'serif'],
        meta: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        ui: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        code: ['Maple Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        heading: ['Newsreader', 'LXGW WenKai', 'serif'],
        note: ['Newsreader', 'LXGW WenKai', 'serif'],
        display: ['Newsreader', 'LXGW WenKai', 'serif'],
      },
      colors: {
        // All colors reference CSS variables so they respond to theme changes automatically
        'paper-bg': 'var(--paper-bg)',
        'paper-bg-deep': 'var(--paper-bg-deep)',
        'paper-surface': 'var(--paper-surface)',
        'paper-surface-muted': 'var(--paper-surface-muted)',
        'paper-line': 'var(--paper-line)',
        'paper-line-strong': 'var(--paper-line-strong)',
        'paper-ink': 'var(--paper-ink)',
        'paper-ink-soft': 'var(--paper-ink-soft)',
        'paper-ink-faint': 'var(--paper-ink-faint)',
        'paper-control': 'var(--paper-control)',
        'paper-control-hover': 'var(--paper-control-hover)',
        'paper-nav': 'var(--paper-nav)',
        'paper-page-bg': 'var(--paper-page-bg)',
        'paper-detail-bg': 'var(--paper-detail-bg)',
        // Accent colors come from palettes.css — already CSS variables
        'paper-accent': 'var(--paper-accent)',
        'paper-accent-soft': 'var(--paper-accent-soft)',
        'paper-fog': 'var(--paper-fog)',
        'paper-dust': 'var(--paper-dust)',
        'paper-rule': 'var(--paper-rule)',
      },
      spacing: {
        'layout-shell-width': '1168px',
        'layout-reading-width': '760px',
        'layout-page-gutter': '32px',
        'layout-page-top': '126px',
        'layout-page-bottom': '72px',
        'page-header-spacing': '54px',
        'page-header-spacing-mobile': '28px',
      },
      fontSize: {
        'h1': '3.052em',
        'h2': '2.441em',
        'h3': '1.953em',
        'h4': '1.563em',
        'h5': '1.25em',
      },
      boxShadow: {
        // Reference CSS variables so shadows respond to theme changes
        'paper-shadow': 'var(--paper-shadow)',
        'paper-shadow-lift': 'var(--paper-shadow-lift)',
      },
      animation: {
        'card-in': 'card-in 420ms both',
        'not-found-in': 'not-found-in 420ms ease both',
      },
      keyframes: {
        'card-in': {
          'from': { opacity: '0', transform: 'translateY(12px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'not-found-in': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;