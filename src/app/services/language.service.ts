import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, map, merge, startWith } from 'rxjs';
import {
  LANGUAGES_ALL_APP,
  LANGUAGES_ALL_VAL_ARR,
  LanguageApp,
  LanguageAppValues,
  LanguagesAllApp,
} from '../shared/models/constants';
import { Location } from '@angular/common';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private languageAllApp = new BehaviorSubject<LanguagesAllApp>(LANGUAGES_ALL_APP);
  private languageApp = new BehaviorSubject<LanguageApp>(LANGUAGES_ALL_APP['en']);
  languageApp$ = this.languageApp.asObservable();
  languagesAllAppArr$ = this.languageAllApp.asObservable().pipe(map((obj) => Object.values(obj)));

  constructor(
    private translate: TranslateService,
    private router: Router,
    private location: Location,
    private metaTitle: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute,
    private plaform: PlatformService,
  ) {
    this.onLangChangeUpdateMetaData();
  }
  public setLang(langObj: LanguageApp) {
    this.languageApp.next(langObj);
    this.translate.use(langObj.value);
    this.changeLangInRoute(langObj.value);
  }

  public initLang() {
    if (this.plaform.isSSR) {
      console.log('\x1b[35m%s\x1b[0m', `language.service H10:56 L45: 'ssr'`);
    }
    const initialLang = this.languageApp.value.value;
    this.translate.setDefaultLang(initialLang);
    this.translate.use(initialLang);
    // this.changeFragmentRoute(initialLang);
  }

  private changeLangInRoute(lang: LanguageAppValues) {
    const currentUrl = this.router.url;
    const urlParts = currentUrl.split('/');
    if (LANGUAGES_ALL_VAL_ARR.includes(urlParts[1])) {
      urlParts[1] = lang;
      const newUrl = urlParts.join('/');
      console.log(newUrl);
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
