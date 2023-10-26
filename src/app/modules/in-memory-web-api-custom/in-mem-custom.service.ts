import { LANGUAGES_ALL_VAL_ARR } from '@app/core/models/constants';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { TRANS_DB, getTranslationFromDb } from './api-intercept/translations-in-memory';
import { USERS_DB } from './db/users-db';
import { environment } from 'environment';
import { apiSignIn } from './api-intercept/api-sign-in';
import { apiGetUser } from './api-intercept/api-get-user';
import { apiSignUp } from './api-intercept/api-sign-up';

export type ApiTranslationsMap<T extends string> = {
  [K in T]: { keys: { [key: string]: string } };
};
export type ApiTranslations = ApiTranslationsMap<(typeof LANGUAGES_ALL_VAL_ARR)[number]>;

export class InMemoryCustomService implements InMemoryDbService {
  createDb() {
    return { translations: TRANS_DB, auth: USERS_DB };
  }

  // parseRequestUrl(url: string, utils: RequestInfoUtilities): any {
  //   // Implement custom URL parsing logic here
  //   // console.log('\x1b[35m%s\x1b[0m', `in-mem-custom.service H14:37 L26: 'url'`, url);
  //   const newUrl = url
  //     .replace('api/auth/signin', 'api/auth')
  //     .replace('api/auth/signup', 'api/auth');
  //   const parsed = utils.parseRequestUrl(newUrl);
  //   const newParsed = { ...parsed, id: Date.now() };
  //   console.log('\x1b[35m%s\x1b[0m', `in-mem-custom.service H14:33 L28: 'parsed'`, newParsed);
  //   return newParsed;
  // }

  get(reqInfo: RequestInfo) {
    console.log(
      '\x1b[35m%s\x1b[0m',
      `in-mem-custom.service H18:11 L32: 'reqinfo'`,
      reqInfo.collection,
    );
    if (reqInfo.collectionName === 'translations') {
      return getTranslationFromDb(reqInfo);
    }

    if (reqInfo.collectionName === 'auth') {
      return apiGetUser(reqInfo);
    }

    return undefined;
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.url === environment.hostUrl + `/api/auth/signin`) {
      // const db = reqInfo.utils.getDb() as any;.
      return apiSignIn(reqInfo);
    }

    if (reqInfo.url === environment.hostUrl + `/api/auth/signup`) {
      // const db = reqInfo.utils.getDb() as any;.
      return apiSignUp(reqInfo);
    }

    return undefined;
  }
}
