import { createTheme, responsiveFontSizes } from "@mui/material/styles";

// Créez un thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      dark: "#004ba0",
    },
    secondary: {
      main: "#ee6730",
    },
  },
  typography: {
    fontFamily: "Evogria, Roboto",
    body1: {
      color: "#fff",
    },
    body2: {
      color: "#000",
    },
    h1: {
      color: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          cursor: "none",
          "&:hover": {
            cursor: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: "gray",
            color: "white",
            borderColor: "gray",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          cursor: "none",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          cursor: "none",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          "&:last-child": {
            paddingBottom: 0,
          },
        },
      },
    },
  },
});

const responsiveTheme = responsiveFontSizes(theme);

export default responsiveTheme;
