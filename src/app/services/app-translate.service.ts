import { Injectable, WritableSignal, signal } from '@angular/core';
import { ApiService } from './api.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Translations } from '../shared/models';
import { defaultLanguage, languagesCode } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  translationsSub$ = new BehaviorSubject<Translations | undefined>(undefined);
  languageSub$ = new BehaviorSubject(defaultLanguage.code);

  constructor(private apiService: ApiService, private translate: TranslateService) {}

  setInitialTranslations() {
    this.setLocalTranslation();
    this.setTranslationFromApi(this.languageSub$.value);
  }

  private setTranslationFromApi(lang: string) {
    this.apiService.getLangTranslations(lang).subscribe((res) => {
      this.translationsSub$.next(res);
    });
  }

  private setLocalTranslation() {
    this.translate.addLangs(languagesCode);
    this.translate.setDefaultLang(defaultLanguage.code);
    const browserLang = this.translate.getBrowserLang();
    const languageRegex = new RegExp(languagesCode.join('|'));
    this.translate.use(browserLang?.match(languageRegex) ? browserLang : defaultLanguage.code);
  }

  changeTranslations(lang: string) {
    this.translate.use(lang);
    this.languageSub$.next(lang);
    this.setTranslationFromApi(lang);
  }
}
