'use client';

import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, useEffect, useState } from 'react';
import { lightTheme, darkTheme } from '@/lib/theme';
import { GlobalStyles } from '@mui/material';

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
    >
      <MUIThemeProvider theme={darkTheme}>
        <CssBaseline />
        <GlobalStyles
          styles={{
            '*': {
              boxSizing: 'border-box',
              margin: 0,
              padding: 0,
            },
            'html, body': {
              height: '100%',
            },
            body: {
              lineHeight: 1.5,
              WebkitFontSmoothing: 'antialiased',
              fontFamily: '"Noto Sans Thai", "Sarabun", sans-serif',
            },
            img: {
              display: 'block',
              maxWidth: '100%',
            },
          }}
        />
        {children}
      </MUIThemeProvider>
    </NextThemesProvider>
  );
} 