'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { themeOptions } from '../styles/theme';

export function Providers({ children }: { children: React.ReactNode }) {
  const theme = createTheme(themeOptions);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
} 