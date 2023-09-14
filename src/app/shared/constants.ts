export const DEFAULT_LANGUAGE = 'en';
export const LANGUAGES = ['en', 'de'] as const;
export const LANGUAGES_TITLE = {
  en: 'English',
  de: 'Deutsch',
};
export type Languages = (typeof LANGUAGES)[number];

export const IMAGES_URL = {
  signUpBg: 'https://res.cloudinary.com/dlqfdoape/image/upload/v1694700133/clothes-1_noappc.png',
};
