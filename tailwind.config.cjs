/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
        "20222e": "#20222e",
        "282a36": "#282a36",
        "2f334a": "#2f334a",
        "edc2d8ff": "#edc2d8ff",
        "4ca662": "#4ca662",
        "b32d2d": "#eb4b4b",
        "5e4fb3": "#5e4fb3",
        "3a3d52": "#3a3d52",
        "000000": "#000000",
        "18181a": "#18181a",
        "1b1b1c": "#1b1b1c",
        "ffffff": "#ffffff",
        "99a4b0": "#99a4b0",
        "cf7b3c": "#cf7b3c",
        "cfca3c": "#cfca3c",
        "4549b5": "#4549b5",
        "6C47FF": "#6C47FF",
        "ac4fb3": "#ac4fb3"
    },
    fontFamily: {
        mono: ['Roboto Mono', 'monospace'],
        sans: ['Rubik', 'sans-serif'],
    },
  },
  plugins: [],
};

module.exports = config;
