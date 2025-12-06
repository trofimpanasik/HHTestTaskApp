import React, { createContext, useContext, useState, useCallback } from 'react';
import { darkTheme, lightTheme, Theme } from './colors';

type ThemeType = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  toggleTheme: () => void;
  setTheme: (type: ThemeType) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: ThemeType;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = 'dark',
}) => {
  const [themeType, setThemeType] = useState<ThemeType>(initialTheme);

  const theme = themeType === 'dark' ? darkTheme : lightTheme;
  const isDark = themeType === 'dark';

  const toggleTheme = useCallback(() => {
    setThemeType(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setTheme = useCallback((type: ThemeType) => {
    setThemeType(type);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themeType,
        toggleTheme,
        setTheme,
        isDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
