/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    // require('flowbite/plugin'),

    // function ({ addUtilities }) {
    //   const svgUtilities = {
    //     '.fill-current': {
    //       fill: 'currentColor',
    //     },
    //     '.stroke-current': {
    //       stroke: 'currentColor',
    //     },
    //   };

    //   addUtilities(svgUtilities, ['responsive', 'hover']);
    // },
  ],
}

