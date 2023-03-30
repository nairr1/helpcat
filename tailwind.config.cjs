/** @type {import("tailwindcss").Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
        "282a36": "#282a36",
        "b5bfc9": "#2f334a",
        "edc2d8ff": "#edc2d8ff",
        "2db34d": "#2db34d",
        "b32d2d": "#eb4b4b",
        "5e4fb3": "#5e4fb3",
        "3a3d52": "#3a3d52",
        "000000": "#000000",
        "181818": "#181818",
        "ffffff": "#ffffff",
    },
    fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
    },
  },
  plugins: [],
};

module.exports = config;
