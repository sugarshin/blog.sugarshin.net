import { useSyncExternalStore } from 'react';

type ThemeState = 'light' | 'dark' | null;

export function useThemeState() {
  function setThemeState(newValue: ThemeState) {
    if (typeof newValue === 'string') {
      window.localStorage.setItem('theme', newValue);
    } else {
      window.localStorage.removeItem('theme');
    }

    window.dispatchEvent(
      new StorageEvent('storage', { key: 'theme', newValue }),
    );
  }

  function subscribe(listener: () => void) {
    window.addEventListener('storage', listener);
    return function unsubscribe() {
      window.removeEventListener('storage', listener);
    };
  }

  function getSnapshot() {
    return window.localStorage.getItem('theme');
  }

  function getServerSnapshot() {
    return null;
  }

  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return [theme, setThemeState] as const;
}
