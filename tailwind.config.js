/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        background: "var(--background-color)",
        text: "var(--text-color)",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["dark"],
    },
  },
};
