import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const r = (...p) => join(__dirname, ...p).replace(/\\/g, '/');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    r('index.html'),
    r('src/**/*.{js,jsx,ts,tsx}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
