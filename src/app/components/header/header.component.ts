import { Component, signal } from '@angular/core';
import { TranslateService } from 'src/app/services/translate.service';
import { languages } from 'src/app/shared/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  lang$ = this.translate.languageSub$();
  languageOptions = languages;
  panelOpenState = false;
  laguagesTitle: any;
  themeOptions = [{ code: 'white', title: 'White' }];
  theme$ = signal('white');

  constructor(public translate: TranslateService) {}

  setLang(lang: string): void {
    this.translate.setLang(lang);
  }

  scrollToTop() {
    window.scrollTo();
  }
}
