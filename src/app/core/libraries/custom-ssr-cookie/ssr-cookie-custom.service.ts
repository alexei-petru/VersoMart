import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { REQUEST } from '@nguniversal/express-engine/tokens';
import { Request } from 'express';
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
    @Inject(REQUEST) request: Request,
  ) {
    super(document, platformId, request);
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
      super.set(name, value, expiresObjOrValue as CookieOptions);
    } else {
      super.set(name, value, expiresObjOrValue, path, domain, secure, sameSite);
    }
  }

  setCustom(
    userAgreement: boolean,
    name: string,
    value: string,
    expires?: number | Date,
    path?: string,
    domain?: string,
    secure?: boolean,
    sameSite?: 'Lax' | 'None' | 'Strict',
  ): void;
  setCustom(userAgreement: boolean, name: string, value: string, options?: CookieOptions): void;
  setCustom(
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
