/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        ibm_regular: ["Poppins-Regular"],
        ibm_medium: ["Poppins-Medium"],
        ibm_bold: ["Poppins-Bold"],
      },
      colors: {
        background: "#FAF0ED",
        darkBlack: "#141414",
        Black: "#383838",
        primary: "#2F2F2F",
        secondaryText: "#8E8E8E",
        White: "#FFFFFF",
        Accent: "#C9A36A",
        Border: "#E5E5E5",
        Brown: "#CC6749",
        Gray: "#979594",
        subTitle: "#E5E4DF",
        Yellow: "#F5C00A",
      },
    },
  },
  plugins: [],
};
