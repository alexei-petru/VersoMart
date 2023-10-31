import {
  ACCESS_TOKEN_KEY,
  COOKIE_APP_LANGUAGE_KEY,
  LANGUAGES_ALL_VAL_ARR,
} from '@app/core/models/constants';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { environment } from 'src/environments/environment';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { Injectable } from '@angular/core';
import { apiVerificationCode } from '@app/modules/in-memory-web-api-custom/api-intercept/api-verification-code';
import { apiGetUser } from '@app/modules/in-memory-web-api-custom/api-intercept/api-get-user';
import { apiSignIn } from '@app/modules/in-memory-web-api-custom/api-intercept/api-sign-in';
import { apiSignUp } from '@app/modules/in-memory-web-api-custom/api-intercept/api-sign-up';
import { USERS_DB } from '@app/modules/in-memory-web-api-custom/db/users-db';
import {
  TRANS_DB,
  getTranslationFromDb,
} from '@app/modules/in-memory-web-api-custom/api-intercept/translations-in-memory';

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
      console.log('\x1b[35m%s\x1b[0m', `in-mem-custom.service H11:25 L53: 'reqInfo'`, reqInfo.url);
      return apiSignIn(reqInfo);
    }

    if (reqInfo.url === environment.hostUrl + `/api/auth/signup`) {
      return apiSignUp(reqInfo);
    }

    if (reqInfo.url === environment.hostUrl + '/api/auth/verificationcode') {
      return apiVerificationCode(reqInfo);
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
