/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [
    require('tailwind-scrollbar-hide'),
    // other plugins...
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}