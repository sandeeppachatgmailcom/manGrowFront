/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  keyframes: {
    rolling: {
      from: { transform: 'translateX(0)' },
      to: { transform: 'translateX(calc(-100vw + 100%))' },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    // other plugins...
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}