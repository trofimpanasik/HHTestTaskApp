const palette = {
  // Оранжевые
  orange: '#FE5900',
  orangeDark: '#CC3F02',
  orangeLight: '#FF9332',
  orangePale: '#FFD8A5',

  // Нейтральные темные
  black: '#0D0D0D',
  darkGray: '#151515',
  gray: '#1A1A1A',
  mediumGray: '#333333',

  // Нейтральные светлые
  lightGray: '#666666',
  silver: '#B3B3B3',
  lightSilver: '#E5E5E5',
  offWhite: '#F5F5F5',
  white: '#FFFFFF',

  // Семантические
  success: '#34C759',
  error: '#FF3B30',
  warning: '#FFCC00',
};

export const darkTheme = {
  background: palette.black,
  backgroundSecondary: palette.darkGray,
  blockBackground: palette.darkGray,
  tabBar: palette.black,

  accent: palette.orange,
  accentDark: palette.orangeDark,
  accentLight: palette.orangeLight,
  accentPale: palette.orangePale,

  textPrimary: palette.white,
  textSecondary: palette.silver,
  textTertiary: palette.lightGray,
  inactive: palette.white,

  divider: palette.gray,
  border: palette.gray,

  cardBackground: palette.darkGray,
  iconBackground: palette.mediumGray,

  expenseBar1: palette.orangeDark,
  expenseBar2: palette.orange,
  expenseBar3: palette.orangeLight,
  expenseBar4: palette.orangePale,

  success: palette.success,
  error: palette.error,
  warning: palette.warning,
};

export const lightTheme = {
  background: palette.white,
  backgroundSecondary: palette.offWhite,
  blockBackground: palette.offWhite,
  tabBar: palette.white,

  accent: palette.orange,
  accentDark: palette.orangeDark,
  accentLight: palette.orangeLight,
  accentPale: palette.orangePale,

  textPrimary: palette.black,
  textSecondary: palette.lightGray,
  textTertiary: palette.silver,
  inactive: palette.lightGray,

  divider: palette.lightSilver,
  border: palette.lightSilver,

  cardBackground: palette.white,
  iconBackground: palette.lightSilver,

  expenseBar1: palette.orangeDark,
  expenseBar2: palette.orange,
  expenseBar3: palette.orangeLight,
  expenseBar4: palette.orangePale,

  success: palette.success,
  error: palette.error,
  warning: palette.warning,
};

export type Theme = typeof darkTheme;
export type ThemeColors = keyof Theme;

export const COLORS = darkTheme;
