/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollSnapAlign: {
        start: 'start',
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.snap-start': {
          scrollSnapAlign: 'start',
        },
      };
      addUtilities(newUtilities);
    },
  ],
}