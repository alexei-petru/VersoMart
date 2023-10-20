import { DOCUMENT, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
// eslint-disable-next-line no-restricted-imports
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { Observable } from 'rxjs';

type CookieOptions = {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Lax' | 'None' | 'Strict';
};

@Injectable({
  providedIn: 'root',
})
export class SsrCookieCustomService extends SsrCookieService {
  private isCookieAccepted$!: Observable<boolean>;
  constructor(
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) platformId: object,
    @Optional() @Inject(REQUEST) request: Request,
  ) {
    if (isPlatformServer(platformId)) {
      super(document, platformId, request);
    }
    if (isPlatformBrowser(platformId)) {
      super(document, platformId, null as never);
    }
  }

  sendCookieAgreement(isCookieAcceptedObs: Observable<boolean>) {
    this.isCookieAccepted$ = isCookieAcceptedObs;
  }

  private setCookie(
    name: string,
    value: string,
    expiresObjOrValue?: CookieOptions | number | Date,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'Lax' | 'None' | 'Strict',
  ) {
    if (typeof expiresObjOrValue === 'object' && expiresObjOrValue !== null) {
      this.set(name, value, expiresObjOrValue as CookieOptions);
    } else {
      this.set(name, value, expiresObjOrValue, path, domain, secure, sameSite);
    }
  }

  setNew(
    /**
     * New set method that need to be specified with a flag whatever its required userConsent for this cookie.
     */
    userConsent: boolean,
    name: string,
    value: string,
    expires?: number | Date,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'Lax' | 'None' | 'Strict',
  ): void;
  setNew(
    /**
     * New set method that need to be specified with a flag whatever its required userConsent for this cookie.
     */
    userAgreement: boolean,
    name: string,
    value: string,
    options?: CookieOptions,
  ): void;
  setNew(
    isUserConsentRequire: boolean,
    name: string,
    value: string,
    expiresObjOrValue?: CookieOptions | number | Date,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'Lax' | 'None' | 'Strict',
  ) {
    if (isUserConsentRequire) {
      this.isCookieAccepted$.subscribe((res) => {
        if (res === true) {
          this.setCookie(name, value, expiresObjOrValue, path, domain, secure, sameSite);
        }
      });
    } else if (!isUserConsentRequire) {
      this.setCookie(name, value, expiresObjOrValue, path, domain, secure, sameSite);
    }
  }
}
