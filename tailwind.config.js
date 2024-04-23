/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    aspectRatio: {
      '4/3': '4 / 10',
    },
    container: {
    },
    fontFamily: {
      sans: ['Evogria', 'sans-serif'],
    },
    colors: {
      primary: 'blue',
      secondary: "#FF0000 ",
      white: "#FFFFFF",
      black: "#000000",
      
      
    },
  plugins: [],
}}