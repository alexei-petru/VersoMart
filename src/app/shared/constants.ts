export const DEFAULT_LANGUAGE = 'en';
export const LANGUAGES = ['en', 'de'] as const;
export const LANGUAGES_TITLE = {
  en: 'English',
  de: 'Deutsch',
};
export type Languages = (typeof LANGUAGES)[number];
