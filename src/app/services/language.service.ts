import { Location, isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID, TransferState } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { REQUESTED_LANGUAGE_KEY } from '@app/core/transfer-state-keys';
import { REQUEST, RESPONSE } from '@nguniversal/express-engine/tokens';
import { TranslateService } from '@ngx-translate/core';
import { Request, Response } from 'express';
import { BehaviorSubject, filter, map, switchMap } from 'rxjs';
import {
  COOKIE_APP_LANGUAGE_KEY,
  LANGUAGES_ALL_APP,
  LANGUAGES_ALL_VAL_ARR,
  LANGUAGE_APP_DEFAULT,
  LanguageApp,
  LanguageAppValues,
  LanguagesAllApp,
} from '../core/models/constants';
import { RouteStateService } from './route-state.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageAllApp = new BehaviorSubject<LanguagesAllApp>(LANGUAGES_ALL_APP);
  private languageApp = new BehaviorSubject<LanguageApp>(this.getInitialLangObj());
  languageApp$ = this.languageApp.asObservable();
  languagesAllAppArr$ = this.languageAllApp.asObservable().pipe(map((obj) => Object.values(obj)));

  constructor(
    private translate: TranslateService,
    private router: Router,
    private location: Location,
    private metaTitle: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute,
    private ssrCookieCustomService: SsrCookieCustomService,
    private transferState: TransferState,
    private routeStateService: RouteStateService,
    @Inject(PLATFORM_ID) private platformId: object,
    @Optional() @Inject(REQUEST) private request: Request,
    @Optional() @Inject(RESPONSE) private response: Response,
  ) {
    this.onRouteChangeUpdateMetaData();
  }

  getCurrentLang() {
    return this.languageApp.value;
  }

  public getInitialLangObj() {
    if (isPlatformBrowser(this.platformId) || isPlatformServer(this.platformId)) {
      const cookieLang = this.ssrCookieCustomService.get(COOKIE_APP_LANGUAGE_KEY);
      if (LANGUAGES_ALL_VAL_ARR.includes(cookieLang)) {
        const cookieLangValid = cookieLang as keyof typeof LANGUAGES_ALL_APP;
        const languageObj = LANGUAGES_ALL_APP[cookieLangValid];
        return languageObj;
      }
    }
    if (isPlatformServer(this.platformId)) {
      const urlParts = this.request.url.split('/');
      const languageFragmentPos = urlParts[1];
      if (LANGUAGES_ALL_VAL_ARR.includes(languageFragmentPos)) {
        return LANGUAGES_ALL_APP[languageFragmentPos as LanguageAppValues];
      }
    }
    if (isPlatformBrowser(this.platformId)) {
      const requestUrlLanguage = this.transferState.get(
        REQUESTED_LANGUAGE_KEY,
        LANGUAGE_APP_DEFAULT.value,
      );
      return LANGUAGES_ALL_APP[requestUrlLanguage];
    }
    return LANGUAGE_APP_DEFAULT;
  }

  public setLang(langObj: LanguageApp, currentPath: string) {
    this.languageApp.next(langObj);
    this.translate.use(langObj.value);
    this.ssrCookieCustomService.setNew(
      false,
      COOKIE_APP_LANGUAGE_KEY,
      langObj.value,
      undefined,
      '/',
    );
    const modifiedLangUrlObj = this.routeStateService.getUrlWithChangedLang(
      currentPath,
      langObj.value,
    );
    if (modifiedLangUrlObj.isNewUrl) {
      this.router.navigateByUrl(modifiedLangUrlObj.url);
    }
  }

  public initTranslationLanguage() {
    const initialLangValue = this.languageApp.value?.value;
    if (initialLangValue) {
      this.translate.setDefaultLang(initialLangValue);
      this.translate.use(initialLangValue);
    }
  }

  private onRouteChangeUpdateMetaData() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => {
          let currentRoute = this.activatedRoute.root;
          while (currentRoute.firstChild) {
            currentRoute = currentRoute.firstChild;
          }
          const routeData = currentRoute.snapshot.data;
          const titleKey = `${routeData['routeKey']}.metaTitleDefault`;
          const descriptionKey = `${routeData['routeKey']}.metaDescriptionDefault`;

          return this.translate.get([titleKey, descriptionKey]);
        }),
      )
      .subscribe((res) => {
        const titleKey = Object.keys(res)[0];
        const descriptionKey = Object.keys(res)[1];
        const titleVal = res[titleKey];
        const descriptionVal = res[descriptionKey];
        if (!titleKey || !descriptionKey) return;
        if (titleKey === titleVal && descriptionKey === descriptionVal) return;
        this.metaTitle.setTitle(titleVal);
        this.metaService.updateTag({ name: 'description', content: descriptionVal });
      });
  }
}
