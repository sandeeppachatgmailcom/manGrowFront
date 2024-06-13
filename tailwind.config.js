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
    extend:  {
      animation: {
        progress: 'progress 4s linear infinite',
        dots: 'dots 10s ease-in-out infinite',
      },
      keyframes: {
        progress: {
          '0%': { width: '0%' },
          '50%': { width: '50%' },
          '75%': { width: '75%' },
          '100%': { width: '100%' },
        },
        dots: {
          '0%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    }, 
  },
  plugins: [],
}