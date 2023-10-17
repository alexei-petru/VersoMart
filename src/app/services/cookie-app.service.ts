import { Injectable } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { BehaviorSubject } from 'rxjs';
import { COOKIE_CONSENT } from '../shared/models/constants';

@Injectable({
  providedIn: 'root',
})
export class CookieAppService {
  private isCookieAccepted = new BehaviorSubject(false);
  private isCookieDisplayed = new BehaviorSubject(true);
  public isCookieAccepted$ = this.isCookieAccepted.asObservable();
  public isCookieDisplayed$ = this.isCookieDisplayed.asObservable();

  constructor(private ssrCookieService: SsrCookieService) {
    this.setStoredCookies();
  }

  acceptCookies() {
    this.isCookieAccepted.next(true);
    this.isCookieDisplayed.next(false);
    this.ssrCookieService.set(COOKIE_CONSENT.key, 'true', undefined, '/');
  }

  denyCookies() {
    this.isCookieDisplayed.next(false);
    this.ssrCookieService.set(COOKIE_CONSENT.key, 'false', undefined, '/');
  }

  private setStoredCookies() {
    const isCookieStored = this.ssrCookieService.get(COOKIE_CONSENT.key);
    if (isCookieStored) {
      const isStoredCookieAccepted = isCookieStored === COOKIE_CONSENT.values.true ? true : false;
      isStoredCookieAccepted && this.isCookieAccepted.next(true);
      this.isCookieDisplayed.next(false);
    }
  }
}
