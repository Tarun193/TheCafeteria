/** @type {import('tailwindcss').Config} */
const plugins = require("tailwindcss/plugin");
export default {
  content: ["./src/**/*.{html,jsx,js}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: "'Roboto Condensed', sans-serif;",
      },
      screens: {
        esm: "425px",
        // => @media (min-width: 450px) { ... }
      },
    },
  },
  plugins: [
    plugins(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
      });
    }),
  ],
};
