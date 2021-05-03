import { useState, useEffect, useCallback } from 'react';
import { ThemeType, toggleTheme } from '@scuf/common';

const darkModeOn =
  window.matchMedia &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;
export const useTheme = (): [ThemeType, () => void] => {
  const [theme, setTheme] = useState<ThemeType>(ThemeType.Dark);
  useEffect(() => {
    toggleTheme(theme);
  }, [theme]);
  const changeTheme = useCallback(() => {
    setTheme(() =>
      theme === ThemeType.Light ? ThemeType.Dark : ThemeType.Light
    );
  }, [theme]);
  return [theme, changeTheme];
};
