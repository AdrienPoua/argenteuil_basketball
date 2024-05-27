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
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
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
});

export default theme;

