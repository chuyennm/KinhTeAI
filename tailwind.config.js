/** @type {import('tailwindcss').Config} */
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: v('bg'),
        panel: v('panel'),
        panel2: v('panel2'),
        line: v('line'),
        ink: v('ink'),
        muted: v('muted'),
        navy: '#0F172A',
        offwhite: '#F8FAFC',
        up: '#10B981',
        down: '#EF4444',
        gold: '#F59E0B',
      },
      fontFamily: {
        serif: ['"Noto Serif"', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Segoe UI"', 'system-ui', '-apple-system', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
