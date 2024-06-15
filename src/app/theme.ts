import { createTheme } from "@mui/material/styles";


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
      textAlign: "center",
      fontSize: "3rem",
      marginTop: "2.5rem",
      marginBottom: "5rem",
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            backgroundColor: "gray",
            color: "white",
            borderColor: "gray",
          },
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: 0, 
          }
        },
      },
    },
  },
});

export default theme;
