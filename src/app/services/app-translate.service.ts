import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter } from 'rxjs';
import { DEFAULT_LANGUAGE, LANGUAGES, Languages } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  languageSub$ = new BehaviorSubject<Languages>(this.translate.currentLang as Languages);
  constructor(
    private translate: TranslateService,
    private router: Router,
    private location: Location,
  ) {
    this.updateLanguageSubOnTranslationChange();
    this.setLocalTranslation();
    this.setLangFromUrl();
  }

  private updateLanguageSubOnTranslationChange() {
    this.translate.onLangChange.subscribe((langEvent) => {
      const lang = langEvent.lang as Languages;
      if (LANGUAGES.includes(lang)) {
        this.changeUrlLangPath(lang);
        this.languageSub$.next(lang);
      }
    });
  }
  private setLangFromUrl() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/') {
          this.translate.use(this.getDefaultLang());
          this.router.navigateByUrl(this.getDefaultLang());
          this.translate.setDefaultLang(this.getDefaultLang());
        }
        const lang = event.urlAfterRedirects.split('/')[1];
        if (LANGUAGES.includes(lang as Languages) && lang !== this.languageSub$.value) {
          this.translate.use(lang);
        }
      });
  }

  private changeUrlLangPath(lang: Languages) {
    const checkLang = this.router.url.split('/').filter(Boolean)[0];
    if (checkLang && LANGUAGES.includes(checkLang as any)) {
      const urlWithNewLang = this.router.url.replace(checkLang, lang);
      this.location.replaceState(urlWithNewLang);
    }
  }

  private setLocalTranslation() {
    this.translate.addLangs([...LANGUAGES]);
    this.translate.setDefaultLang(this.getDefaultLang());
  }

  private getDefaultLang() {
    const storedLang = false;
    if (storedLang) {
      return storedLang;
    } else {
      return this.getBrowserLang();
    }
  }

  private getBrowserLang() {
    const browserLang = this.translate.getBrowserLang();
    const languageRegex = new RegExp(LANGUAGES.join('|'));
    return browserLang?.match(languageRegex) ? browserLang : DEFAULT_LANGUAGE;
  }
}
