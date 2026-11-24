import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter Tight', 'Archivo', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      backdropBlur: {
        dock: '20px',
      },
    },
  },
  plugins: [],
};

export default config;

