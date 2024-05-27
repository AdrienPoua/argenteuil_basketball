// theme.js
import { createTheme } from '@mui/material/styles';

// Créez un thème personnalisé
const theme = createTheme({
    palette: {
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
    },
});

export default theme;
