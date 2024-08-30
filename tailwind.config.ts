
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
      cursor: {
        pointer: 'none',
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
      boxShadow: {
        'custom': 'rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset',
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