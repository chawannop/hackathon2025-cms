import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import type { ThemeOptions, PaletteOptions } from '@mui/material/styles';

// Define common theme settings
const themeSettings: ThemeOptions = {
  typography: {
    fontFamily: '"Noto Sans Thai", "Sarabun", "Roboto", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 800,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: '1.125rem',
      lineHeight: 1.75,
      letterSpacing: '0.01em',
    },
    body2: {
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0.01em',
    },
    button: {
      textTransform: 'none' as const,
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 28px',
          transition: 'all 0.3s ease-in-out',
          fontWeight: 600,
        },
        contained: {
          background: 'linear-gradient(135deg, #6B46C1 0%, #9F7AEA 100%)',
          boxShadow: '0 8px 20px rgba(107, 70, 193, 0.2)',
          '&:hover': {
            background: 'linear-gradient(135deg, #553C9A 0%, #805AD5 100%)',
            boxShadow: '0 10px 24px rgba(107, 70, 193, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: '2px',
          '&:hover': {
            borderWidth: '2px',
            background: 'rgba(107, 70, 193, 0.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          transition: 'all 0.4s ease-in-out',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          transition: 'all 0.3s ease-in-out',
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.05)',
              transform: 'translateY(-2px)',
            },
            '&.Mui-focused': {
              background: 'rgba(255, 255, 255, 0.07)',
            },
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        },
      },
    },
  },
};

// Light theme palette
const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#6B46C1',
    light: '#9F7AEA',
    dark: '#553C9A',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#4A5568',
    light: '#718096',
    dark: '#2D3748',
    contrastText: '#ffffff',
  },
  background: {
    default: '#F7FAFC',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#2D3748',
    secondary: '#4A5568',
  },
};

// Dark theme palette
const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#9F7AEA',
    light: '#B794F4',
    dark: '#6B46C1',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#A0AEC0',
    light: '#CBD5E0',
    dark: '#718096',
    contrastText: '#1A202C',
  },
  background: {
    default: '#1A202C',
    paper: '#2D3748',
  },
  text: {
    primary: '#F7FAFC',
    secondary: '#E2E8F0',
  },
};

// Create base themes
const lightThemeBase = createTheme({
  ...themeSettings,
  palette: lightPalette,
});

const darkThemeBase = createTheme({
  ...themeSettings,
  palette: darkPalette,
});

// Apply responsive font sizes
export const lightTheme = responsiveFontSizes(lightThemeBase);
export const darkTheme = responsiveFontSizes(darkThemeBase); 