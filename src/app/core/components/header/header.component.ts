import { Component, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AppTranslateService } from 'src/app/services/app-translate.service';
import { languages } from 'src/app/shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  lang$ = toSignal(this.appTranslate.languageSub$);
  languageOptions = languages;
  panelOpenState = false;
  laguagesTitle: any;
  themeOptions = [{ code: 'white', title: 'White' }];
  theme$ = signal('white');

  constructor(public appTranslate: AppTranslateService) {}

  setLang(lang: string): void {
    this.appTranslate.changeTranslations(lang);
  }

  scrollToTop() {
    window.scrollTo();
  }
}
