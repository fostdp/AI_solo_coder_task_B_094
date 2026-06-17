/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-indigo': '#1a1a2e',
        'dark-indigo': '#16213e',
        'bronze': '#c9a96e',
        'bronze-dark': '#a68b52',
        'vermilion': '#c84b31',
        'jade': '#2d6a4f',
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
        sans: ['"Noto Sans SC"', 'sans-serif'],
      },
      boxShadow: {
        'bronze-glow': '0 0 20px rgba(201, 169, 110, 0.4)',
        'alert-glow': '0 0 30px rgba(200, 75, 49, 0.6)',
      },
    },
  },
  plugins: [],
}
