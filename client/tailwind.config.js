/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        heightWithoutNavbar: "calc(100vh - 80px)",
      },
      backgroundImage: {
        unsplashBgImage: "url('./patternbg.png')",
      },
      fontFamily: {
        lora: ["lora", "serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        navyblue: "#0077b5",
        darkgray: "#333333",
      },
    },
  },
  plugins: [],
};
