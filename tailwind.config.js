/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tactical: {
          950: '#0b0f12',
          900: '#11171d',
          800: '#1a232c',
          700: '#25323f',
          600: '#344556',
          500: '#485e75',
          accent: '#10b981', // green / mortar
          artillery: '#f59e0b', // amber / artillery
          alert: '#ef4444', // red / out of range
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      }
    },
  },
  plugins: [],
}
