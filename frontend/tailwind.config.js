/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        textBold: "#203656",
        textBase: "#8f9bae",
        buttonColor: "#ff757a",
        textWhite: "#fff",
      },
    },
  },
  plugins: [],
};
