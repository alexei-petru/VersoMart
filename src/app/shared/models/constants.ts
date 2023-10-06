export const IMAGES_URL = {
  signUpBg: 'https://res.cloudinary.com/dlqfdoape/image/upload/v1694700133/clothes-1_noappc.png',
};

// styling
export const BREAKPOINTS_CUSTOM_APP = {
  xsmall: 320,
  small: 480,
  smallMedium: 600,
  medium: 768,
  mediumLarge: 900,
  large: 1024,
  xlarge: 1200,
};

//themes
export const THEMES_ALL_APP = {
  lightPurple: {
    className: 'app-light-purple-theme',
    value: 'light-purple',
    title: 'Light purple',
  },
  lightIndigo: {
    className: 'app-light-indigo-theme',
    value: 'light-indigo',
    title: 'Light indigo',
  },
  darkPurple: {
    className: 'app-dark-purple-theme',
    value: 'dark-purple',
    title: 'Dark purple',
  },
  darkPink: {
    className: 'app-dark-pink-theme',
    value: 'dark-pink',
    title: 'Dark pink',
  },
} as const;
export type ThemesAllApp = typeof THEMES_ALL_APP;
export type ThemeApp = (typeof THEMES_ALL_APP)[keyof typeof THEMES_ALL_APP];
export type ThemeAppValues = (typeof THEMES_ALL_APP)[keyof typeof THEMES_ALL_APP]['value'];

//languages
// export const DEFAULT_LANGUAGE = { value: 'en', title: 'English' } as const;
export const LANGUAGES_ALL_APP = {
  de: { value: 'en', title: 'English' },
  en: { value: 'de', title: 'Deutsch' },
} as const;
export const LANGUAGES_ALL_VAL_ARR = ['en', 'de'];
export type LanguagesAllApp = typeof LANGUAGES_ALL_APP;
export type LanguageApp = (typeof LANGUAGES_ALL_APP)[keyof typeof LANGUAGES_ALL_APP];
export type LanguageAppValues = (typeof LANGUAGES_ALL_APP)[keyof typeof LANGUAGES_ALL_APP]['value'];
