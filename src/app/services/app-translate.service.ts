import { Injectable } from '@angular/core';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { Languages } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  languageSub$ = new BehaviorSubject<Languages>(this.translate.currentLang as Languages);
  constructor(private translate: TranslateService, private translateRoute: LocalizeRouterService) {}

  public setLang(lang: Languages) {
    this.languageSub$.next(lang);
    this.translateRoute.changeLanguage(lang);
  }
}
