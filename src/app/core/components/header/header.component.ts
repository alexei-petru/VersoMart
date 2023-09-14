import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { AppTranslateService } from 'src/app/services/app-translate.service';
import { LANGUAGES, LANGUAGES_TITLE, Languages } from 'src/app/shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  lang = toSignal(this.appTranslate.languageSub$);
  languageOptions = LANGUAGES;
  languagesTitle = LANGUAGES_TITLE;
  panelOpenState = false;
  themeOptions = [{ code: 'white', title: 'White' }];
  theme$ = signal('white');

  constructor(
    private appTranslate: AppTranslateService,
    private translate: TranslateService,
    private translateRoute: LocalizeRouterService,
  ) {}

  setLang(lang: Languages): void {
    this.appTranslate.setLang(lang);
  }

  scrollToTop() {
    window.scrollTo();
  }
}
