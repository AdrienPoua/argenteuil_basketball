
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
      textUnderlineOffset: {
        4: '4px',
        8: '8px',
        12: '12px',
      },
      spacing: {
        'card': '32rem',
      },
      colors: {
        primary: {
          DEFAULT: '#1976d2',
          dark: '#004ba0',   
          light: '#63a4ff',  
        },
        secondary: {
          DEFAULT: '#FF0000',
          dark: '#b20000',   
          light: '#ff6666',  
        },
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