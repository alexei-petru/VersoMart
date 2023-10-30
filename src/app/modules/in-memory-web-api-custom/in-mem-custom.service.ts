import {
  ACCESS_TOKEN_KEY,
  COOKIE_APP_LANGUAGE_KEY,
  LANGUAGES_ALL_VAL_ARR,
} from '@app/core/models/constants';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { TRANS_DB, getTranslationFromDb } from './api-intercept/translations-in-memory';
import { USERS_DB } from './db/users-db';
import { environment } from 'environment';
import { apiSignIn } from './api-intercept/api-sign-in';
import { apiGetUser } from './api-intercept/api-get-user';
import { apiSignUp } from './api-intercept/api-sign-up';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { Injectable } from '@angular/core';

export type ApiTranslationsMap<T extends string> = {
  [K in T]: { keys: { [key: string]: string } };
};
export type ApiTranslations = ApiTranslationsMap<(typeof LANGUAGES_ALL_VAL_ARR)[number]>;

export interface InMemoryCookieReceived {
  accessToken?: string;
  lang?: string;
}

@Injectable({
  providedIn: 'root',
})
export class InMemoryCustomService implements InMemoryDbService {
  constructor(private customSsrCookie: SsrCookieCustomService) {}
  createDb() {
    return { translations: TRANS_DB, auth: USERS_DB };
  }

  get(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'translations') {
      return getTranslationFromDb(reqInfo);
    }

    if (reqInfo.collectionName === 'auth') {
      return apiGetUser(reqInfo, this.getCookiesValues());
    }

    return undefined;
  }

  post(reqInfo: RequestInfo) {
    if (reqInfo.url === environment.hostUrl + `/api/auth/signin`) {
      return apiSignIn(reqInfo);
    }

    if (reqInfo.url === environment.hostUrl + `/api/auth/signup`) {
      return apiSignUp(reqInfo);
    }

    return undefined;
  }

  private getCookiesValues(): InMemoryCookieReceived {
    const returnedCookies = {
      accessToken: this.customSsrCookie.get(ACCESS_TOKEN_KEY),
      lang: this.customSsrCookie.get(COOKIE_APP_LANGUAGE_KEY),
    };
    return returnedCookies;
  }
}
