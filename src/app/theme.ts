import { createTheme } from '@mui/material/styles';

// Créez un thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: 'black', // Ajoutez la couleur de fond globale ici
    },
  },
  typography: {
    fontFamily : 'Evogria',
    body1: {
      color: '#fff',
    },
    body2: {
      color: '#000',
    },
    h1: {
      color: '#ffffff', 
      textAlign: 'center', 
      fontSize: '3rem', 
      marginTop: '2.5rem',
      marginBottom: '5rem', 
    },
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        maxWidthXl: {
          maxWidth: '2800px', // Correction de la propriété maxWidthXl
        },
      },
    },
  },
});

export default theme;
