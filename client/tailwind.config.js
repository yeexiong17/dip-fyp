/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  darkMode: ['class', '[data-mode="light"]'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
  ],
}

