import { createTheme } from '@mui/material/styles';

// Café Las Acacias - Material UI Theme
// Estética: Rústica premium, cálida, artesanal
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: 'hsl(24, 35%, 22%)',
      light: 'hsl(24, 30%, 35%)',
      dark: 'hsl(24, 40%, 15%)',
      contrastText: 'hsl(36, 33%, 97%)',
    },
    secondary: {
      main: 'hsl(36, 25%, 88%)',
      light: 'hsl(36, 25%, 92%)',
      dark: 'hsl(36, 25%, 80%)',
      contrastText: 'hsl(24, 35%, 22%)',
    },
    error: {
      main: 'hsl(0, 72%, 45%)',
      contrastText: 'hsl(36, 33%, 97%)',
    },
    warning: {
      main: 'hsl(42, 75%, 50%)', // harvest
      contrastText: 'hsl(24, 35%, 15%)',
    },
    success: {
      main: 'hsl(85, 25%, 35%)', // nature
      contrastText: 'hsl(36, 33%, 97%)',
    },
    background: {
      default: 'hsl(36, 33%, 97%)',
      paper: 'hsl(36, 30%, 95%)',
    },
    text: {
      primary: 'hsl(24, 10%, 15%)',
      secondary: 'hsl(24, 10%, 45%)',
    },
    divider: 'hsl(36, 20%, 85%)',
  },
  typography: {
    fontFamily: '"Inter", system-ui, sans-serif',
    h1: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      letterSpacing: '-0.025em',
    },
    h2: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    h5: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: '"Playfair Display", Georgia, serif',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          padding: '12px 24px',
          fontSize: '0.9375rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 20px -4px hsla(24, 35%, 22%, 0.3)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 8px 30px -8px hsla(24, 35%, 22%, 0.12)',
          transition: 'all 0.5s ease-out',
          '&:hover': {
            boxShadow: '0 20px 50px -15px hsla(24, 35%, 22%, 0.18)',
            transform: 'translateY(-8px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
});

// Custom colors for extended palette
export const customColors = {
  accent: 'hsl(18, 45%, 45%)', // terracota
  nature: 'hsl(85, 25%, 35%)', // verde oliva
  harvest: 'hsl(42, 75%, 50%)', // dorado cosecha
  cream: 'hsl(36, 33%, 97%)',
};

export default theme;
