/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pm: "#037D41",
        pmd: "#03522b",
        label: "#222",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui"],
        display: ["Poppins"],
        inter: ["Inter", "sans-serif"],
        body: ["Poppins"],
      },
      maxWidth: {
        primary: "1490px",
      },
    },
  },
  variants: {
    extend: {
      display: ["group-focus", "group-hover"],
    },
  },
  plugins: [],
});
