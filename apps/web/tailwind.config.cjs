/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        vdao: {
          light: "#36DFAE",
          dark: "#1D555C",
          deep: "#06121E",

          pink: "#FBB0B3",
          purple: "#CCD7FF",
          lightpurple: "#F8F2FF",
        },
      },
    },
  },
  plugins: [],
};

module.exports = config;
