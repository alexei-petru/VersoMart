import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, switchMap } from 'rxjs';
import { DEFAULT_LANGUAGE, LANGUAGES, Languages } from '../shared/constants';
import { Translations } from '../shared/models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  translationsSub$ = new BehaviorSubject<Translations | undefined>(undefined);
  languageSub$ = new BehaviorSubject<Languages>(DEFAULT_LANGUAGE);

  constructor(
    private translate: TranslateService,
    private router: Router,
    private location: Location,
    private apiService: ApiService,
  ) {
    this.onLanguageSubChange();
    this.setTranslationSub();
    this.setLangFromUrl();
  }

  setInitialTranslations() {
    this.setLocalTranslation();
  }

  changeTranslations(lang: Languages) {
    this.translate.use(lang);
    this.languageSub$.next(lang);
  }

  private setLangFromUrl() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const lang = event.urlAfterRedirects.split('/')[1];
        if (LANGUAGES.includes(lang as Languages)) {
          this.languageSub$.next(lang as Languages);
        }
      });
  }

  private onLanguageSubChange() {
    this.languageSub$.pipe().subscribe((lang) => {
      this.changeUrlLangPath(lang);
      this.translate.use(lang);
    });
  }

  private changeUrlLangPath(lang: Languages) {
    const checkLang = this.router.url.split('/').filter(Boolean)[0];
    if (checkLang && LANGUAGES.includes(checkLang as any)) {
      const urlWithNewLang = this.router.url.replace(checkLang, lang);
      this.location.replaceState(urlWithNewLang);
    }
  }

  private setTranslationSub() {
    this.languageSub$
      .pipe(switchMap((lang) => this.apiService.getLangTranslations(lang)))
      .subscribe((translations) => {
        this.translationsSub$.next(translations);
      });
  }

  private setLocalTranslation() {
    this.translate.addLangs([...LANGUAGES]);
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
    const browserLang = this.translate.getBrowserLang();
    const languageRegex = new RegExp(LANGUAGES.join('|'));
    this.translate.use(browserLang?.match(languageRegex) ? browserLang : DEFAULT_LANGUAGE);
  }
}
