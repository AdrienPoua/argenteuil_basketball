
// Importez le type Config depuis tailwindcss
import type { Config } from "tailwindcss";

// Définissez votre configuration Tailwind
const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main : ["Evogria", "sans-serif"],
        secondary: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: "#1976d2",
        secondary: "#FF0000",
        white: "#FFFFFF",
        black: "#000000",
      },
      width: {
        card: "500px",
      }, 
      height: {
        card: "500px",
        bigCard: "1000px",
      },
      transitionProperty: {
        'max-height': 'max-height'
      }
       },
  },
  plugins: [],
};

// Exportez la configuration
export default config;
