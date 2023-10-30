export const IMAGES_URL = {
  verificationPage:
    'https://res.cloudinary.com/versomart/image/upload/v1698678723/versomart-img/verification-page_jde4z1.jpg',
  signUpPage:
    'https://res.cloudinary.com/versomart/image/upload/v1697799392/versomart-img/shopping-4011117_1280_qw5kaj.jpg',
  signInPage: 'https://res.cloudinary.com/versomart/image/upload/v1696940639/auth-page-clothes.png',
};

// styling
export const BREAKPOINTS_CUSTOM_APP = {
  xsmall: 320,
  small: 480,
  smallMedium: 600,
  medium: 768,
  mediumLarge: 900,
  large: 1024,
  xlarge: 1440,
};

//themes
export const THEMES_ALL_APP = {
  lightPurple: {
    className: 'app-light-purple-theme',
    value: 'light-purple',
    title: 'Light purple',
    isLightTheme: true,
  },
  lightIndigo: {
    className: 'app-light-indigo-theme',
    value: 'light-indigo',
    title: 'Light indigo',
    isLightTheme: true,
  },
  darkPurple: {
    className: 'app-dark-purple-theme',
    value: 'dark-purple',
    title: 'Dark purple',
    isLightTheme: false,
  },
  darkPink: {
    className: 'app-dark-pink-theme',
    value: 'dark-pink',
    title: 'Dark pink',
    isLightTheme: false,
  },
} as const;
export type ThemesAllApp = typeof THEMES_ALL_APP;
export type ThemeApp = (typeof THEMES_ALL_APP)[keyof typeof THEMES_ALL_APP];
export type ThemeAppValues = (typeof THEMES_ALL_APP)[keyof typeof THEMES_ALL_APP]['value'];

//languages
// export const DEFAULT_LANGUAGE = { value: 'en', title: 'English' } as const;
export const LANGUAGES_ALL_APP = {
  en: { value: 'en', title: 'English' },
  de: { value: 'de', title: 'Deutsch' },
} as const;
export const LANGUAGES_ALL_VAL_ARR = ['en', 'de'];
export const COOKIE_APP_LANGUAGE_KEY = 'USER_LANG';
export const LANGUAGE_APP_DEFAULT: LanguageApp = LANGUAGES_ALL_APP.en;
export type LanguagesAllApp = typeof LANGUAGES_ALL_APP;
export type LanguageApp = (typeof LANGUAGES_ALL_APP)[keyof typeof LANGUAGES_ALL_APP];
export type LanguageAppValues = (typeof LANGUAGES_ALL_APP)[keyof typeof LANGUAGES_ALL_APP]['value'];

// keys
export const COOKIE_CONSENT = {
  key: 'COOKIE_CONSENT',
  values: { true: 'true', false: 'false' },
};
export const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN_KEY';
export const ACCESS_TOKEN_EXPIRES_DAYS = 2;

// api
//  same as in json translation
export const API_ERRORS_KEYS = {
  // shared
  sharedInvalid: 'sharedInvalid',
  sharedSomethingWrong: 'sharedSomethingWrong',
  // form
  formCommonRequired: 'formCommonRequired',
  formCommonInvalidCredentials: 'formCommonInvalidCredentials',
  // email
  emailInvalid: 'emailInvalid',
  emailExist: 'emailExist',
  emailRequired: 'emailRequired',
  // password
  passwordNoDigit: 'passwordNoDigit',
  passwordIncorrectLength: 'passwordIncorrectLength',
  passwordInvalid: 'passwordInvalid',
  passwordRequired: 'passwordRequired',
  // misc
  termsAndPrivacyRequired: 'termsAndPrivacyRequired',
} as const;
export type ApiErrorsKeys = (typeof API_ERRORS_KEYS)[keyof typeof API_ERRORS_KEYS];

export const ERROR_RESPONSE_TYPE = {
  common: 'common',
  email: 'email',
  password: 'password',
} as const;
export type ErrorResponseType = (typeof ERROR_RESPONSE_TYPE)[keyof typeof ERROR_RESPONSE_TYPE];
