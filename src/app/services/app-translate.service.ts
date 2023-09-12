import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, switchMap } from 'rxjs';
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
  }

  setInitialTranslations() {
    this.setLocalTranslation();
  }

  changeTranslations(lang: Languages) {
    this.translate.use(lang);
    this.languageSub$.next(lang);
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
    this.languageSub$.pipe(switchMap((lang) => this.apiService.getLangTranslations(lang))).subscribe((translations) => {
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
