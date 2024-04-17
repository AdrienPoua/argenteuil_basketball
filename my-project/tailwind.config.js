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
    fontFamily: {
      sans: ['evogria', 'sans-serif'],
    },
  plugins: [],
}}