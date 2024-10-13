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
      },
      boxShadow: {
        'foggy': '0 0 20px 10px rgba(255, 255, 255, 0.1), 0 0 40px 20px rgba(255, 255, 255, 0.1), 0 0 60px 30px rgba(255, 255, 255, 0.1)',
      },
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