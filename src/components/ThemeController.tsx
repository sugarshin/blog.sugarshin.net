'use client';

import { useEffect } from 'react';
import { useThemeState } from '~/hooks/useThemeState';

export default function ThemeController() {
  const [theme] = useThemeState();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.dataset.theme = 'black';
    } else if (theme === 'light') {
      document.documentElement.dataset.theme = 'lofi';
    } else {
      delete document.documentElement.dataset.theme;
    }
  }, [theme]);

  return <></>;
}
