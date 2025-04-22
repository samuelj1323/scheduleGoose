/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1a237e",
          dark: "#121858",
        },
        background: {
          light: "#ffffff",
          dark: "#121212",
        },
        text: {
          light: "#1f2937",
          dark: "#f3f4f6",
        },
      },
    },
  },
  plugins: [],
};
