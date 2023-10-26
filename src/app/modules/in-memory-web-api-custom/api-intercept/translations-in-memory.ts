import { RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';
import { ApiTranslations } from '../in-mem-custom.service';

export const TRANS_DB: ApiTranslations = {
  en: { keys: { apiTest: 'En Api test fetched' } },
  de: { keys: { apiTest: 'DE Api test fetched' } },
  // Add more languages here
};

export const getTranslationFromDb = (reqInfo: RequestInfo) => {
  const lang = reqInfo.query.get('lang')?.[0]; // get the 'lang' query parameter
  const translations = lang ? (reqInfo.collection[lang] ? reqInfo.collection[lang] : null) : null;

  const options: ResponseOptions = translations
    ? {
        body: translations,
        status: 200,
      }
    : {
        body: { error: `Translations not found` },
        status: 404,
      };

  return reqInfo.utils.createResponse$(() => options);
};
