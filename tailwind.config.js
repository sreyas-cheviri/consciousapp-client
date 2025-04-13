/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    'bg-blue-100',
    'bg-green-100',
    'bg-yellow-100',
    'bg-purple-100'
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily:{
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        recoleta: ['Recoleta', 'serif'],
        instrument: ['Instrument Serif', 'serif']
      },
      colors:{
        primary : "#242421",
        secondary:"#171717"
      },
      keyframes: {
        smoothLanding: {
          "0%": { opacity: "0", transform: "translateY(15px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        smoothLanding: "smoothLanding 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};
