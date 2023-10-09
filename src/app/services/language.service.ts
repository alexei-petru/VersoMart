import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, map, merge, startWith } from 'rxjs';
import {
  LANGUAGES_ALL_APP,
  LanguageApp,
  LanguageAppValues,
  LanguagesAllApp,
} from '../shared/models/constants';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageAllApp = new BehaviorSubject<LanguagesAllApp>(LANGUAGES_ALL_APP);
  private languageApp = new BehaviorSubject<LanguageApp>(this.getTranslateLangAsObj());
  languageApp$ = this.languageApp.asObservable();
  languagesAllAppArr$ = this.languageAllApp.asObservable().pipe(map((obj) => Object.values(obj)));

  constructor(
    private translate: TranslateService,
    private translateRoute: LocalizeRouterService,
    private router: Router,
    private metaTitle: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute,
  ) {
    this.onLangChangeUpdateMetaData();
  }
  public setLang(langObj: LanguageApp) {
    this.languageApp.next(langObj);
    this.translateRoute.changeLanguage(langObj.value);
  }

  private getTranslateLangAsObj(): LanguageApp {
    const translateLanguage = this.translate.currentLang as LanguageAppValues;
    const languageObj = LANGUAGES_ALL_APP[translateLanguage];
    return languageObj;
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
        const titleKey = `${routeData['routeKey']}.META_TITLE`;
        const descriptionKey = `${routeData['routeKey']}.META_DESCRIPTION`;
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
