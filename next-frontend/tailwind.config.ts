import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#172b45',
          soft: '#1e3658',
        },
        brand: {
          DEFAULT: '#1f568e',
          dark: '#1f4f87',
          deep: '#163c69',
        },
        gold: {
          DEFAULT: '#d2a048',
          light: '#e0b25d',
          deep: '#d7a343',
          pale: '#d9a441',
        },
        line: '#d8e0e8',
        mist: '#e9eff6',
        ink: '#5b6b7f',
        footer: {
          DEFAULT: '#283f66',
          text: '#d4dceb',
          muted: '#aebbd0',
        },
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['Georgia', "'Times New Roman'", 'serif'],
      },
      letterSpacing: {
        widecaps: '0.28em',
      },
      boxShadow: {
        card: '0 1px 2px rgb(23 43 69 / 0.06)',
        lift: '0 12px 28px rgb(23 43 69 / 0.14)',
        search: '0 12px 30px rgb(7 26 50 / 0.24)',
      },
    },
  },
  plugins: [],
};

export default config;
