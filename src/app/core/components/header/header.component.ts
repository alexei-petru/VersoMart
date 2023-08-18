import { Component } from '@angular/core';
import { TranslateService } from 'app/core/services/translate.service';
import { languages } from 'app/shared/constants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  lang$: Observable<string>;
  languageOptions = languages;
  panelOpenState = false;
laguagesTitle: any;

  constructor(public translate: TranslateService) {
    this.lang$ = this.translate.getLang$();
  }

  setLang(lang: string): void {
    const langUpdate = {
      lang,
    };
  }

  scrollToTop() {}
}
