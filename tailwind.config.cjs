/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
        "b5bfc9": "#b5bfc9",
        "ced7d9": "#ced7d9",
        "edc2d8ff": "#edc2d8ff",
        "2db34d": "#2db34d",
        "b32d2d": "#eb4b4b",
        "5e4fb3": "#5e4fb3",
        "000000": "#000000",
    },
    fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
    },
  },
  plugins: [],
};

module.exports = config;
