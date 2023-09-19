import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppTranslateService } from 'src/app/services/app-translate.service';
import { LANGUAGES, LANGUAGES_TITLE, Languages } from 'src/app/shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  lang = toSignal(this.appTranslateService.languageSub$);
  languageOptions = LANGUAGES;
  languagesTitle = LANGUAGES_TITLE;
  panelOpenState = false;
  themeOptions = [{ code: 'white', title: 'White' }];
  theme$ = signal('white');

  constructor(private appTranslateService: AppTranslateService) {}

  setLang(lang: Languages): void {
    this.appTranslateService.setLang(lang);
  }

  scrollToTop() {
    window.scrollTo();
  }
}
