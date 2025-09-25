import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eef2ff',
          200: '#c7d2fe',
          500: '#2563EB',
          600: '#1D4ED8',
        },
        success: {
          50: '#ecfdf3',
          100: '#d1fae5',
          700: '#047857',
        },
        error: {
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      boxShadow: {
        card: '0 30px 60px -20px rgba(37, 99, 235, 0.25)',
      },
      borderRadius: {
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
