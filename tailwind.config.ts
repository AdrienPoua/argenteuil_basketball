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
        sans: ["Evogria", "sans-serif"],
      },
      colors: {
        primary: "blue",
        secondary: "#FF0000",
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
};

// Exportez la configuration
export default config;
