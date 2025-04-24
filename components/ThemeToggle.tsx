'use client';

import { IconButton } from '@mui/material';
import { useTheme } from 'next-themes';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <IconButton
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      color="inherit"
      sx={{
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'rotate(180deg)',
        },
      }}
      aria-label="toggle theme"
    >
      {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
} 