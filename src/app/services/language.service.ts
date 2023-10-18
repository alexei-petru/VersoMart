import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Event, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, map, merge, startWith, take } from 'rxjs';
import {
  COOKIE_APP_LANGUAGE_KEY,
  LANGUAGES_ALL_APP,
  LANGUAGES_ALL_VAL_ARR,
  LANGUAGE_APP_DEFAULT,
  LanguageApp,
  LanguageAppValues,
  LanguagesAllApp,
} from '../shared/models/constants';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageAllApp = new BehaviorSubject<LanguagesAllApp>(LANGUAGES_ALL_APP);
  private languageApp = new BehaviorSubject<LanguageApp>(this.getInitialLang());
  languageApp$ = this.languageApp.asObservable();
  languagesAllAppArr$ = this.languageAllApp.asObservable().pipe(map((obj) => Object.values(obj)));

  constructor(
    private translate: TranslateService,
    private router: Router,
    private location: Location,
    private metaTitle: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute,
    private cookieCustomService: SsrCookieCustomService,
  ) {
    this.onLangChangeUpdateMetaData();
  }

  public getInitialLang() {
    const cookieLang = this.cookieCustomService.get(COOKIE_APP_LANGUAGE_KEY);
    if (LANGUAGES_ALL_VAL_ARR.includes(cookieLang)) {
      const cookieLangValid = cookieLang as keyof typeof LANGUAGES_ALL_APP;
      const languageObj = LANGUAGES_ALL_APP[cookieLangValid];

      return languageObj;
    }
    return LANGUAGE_APP_DEFAULT;
  }

  public setLang(langObj: LanguageApp) {
    this.languageApp.next(langObj);
    this.translate.use(langObj.value);
    this.cookieCustomService.setCustom(
      false,
      COOKIE_APP_LANGUAGE_KEY,
      langObj.value,
      undefined,
      '/',
    );
    this.replaceUrlLangState(this.router.url, langObj.value);
  }

  public initLang() {
    const initialLangValue = this.languageApp.value.value;
    this.translate.setDefaultLang(initialLangValue);
    this.changeUrlLanguage(initialLangValue);
    this.translate.use(initialLangValue);
  }

  public changeUrlLanguage(lang: LanguageAppValues) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1),
      )
      .subscribe((event_2: Event) => {
        const event = event_2 as NavigationEnd;
        this.replaceUrlLangState(event.url, lang);
      });
  }

  private replaceUrlLangState(url: string, lang: LanguageAppValues) {
    const urlParts = url.split('/');
    const languageFragmentPos = urlParts[1];
    if (LANGUAGES_ALL_VAL_ARR.includes(languageFragmentPos) || !languageFragmentPos.length) {
      urlParts[1] = lang;
      const newUrl = urlParts.join('/');
      this.location.replaceState(newUrl);
    }
  }

  private onLangChangeUpdateMetaData() {
    merge(
      this.translate.onLangChange.pipe(startWith(null)),
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    ).subscribe(() => {
      let currentRoute = this.activatedRoute.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }

      const routeData = currentRoute.snapshot.data;
      if (routeData) {
        const titleKey = `${routeData['routeKey']}.metaTitle`;
        const descriptionKey = `${routeData['routeKey']}.metaDescription`;
        if (!routeData['routeKey']) return;
        this.translate.get([titleKey, descriptionKey]).subscribe((res) => {
          const titleVal = res[titleKey];
          const descriptionVal = res[descriptionKey];
          this.metaTitle.setTitle(titleVal);
          this.metaService.updateTag({ name: 'description', content: descriptionVal });
        });
      }
    });
  }
}
