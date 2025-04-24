'use client';

import { ThemeOptions } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
      light: '#757de8',
      dark: '#002984',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#030711',
      paper: 'rgba(255, 255, 255, 0.05)',
    },
  },
  typography: {
    fontFamily: '"Noto Sans Thai", "Sarabun", "Roboto", "Arial", sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
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
      },
    },
  },
}; 