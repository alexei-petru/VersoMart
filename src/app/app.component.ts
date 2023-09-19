import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppTranslateService } from './services/app-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'VersoMart';
  isDarkTheme: Observable<boolean> = of(false);
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private AppTranslate: AppTranslateService,
  ) {
    this.updatePageLang();
  }

  private updatePageLang() {
    this.AppTranslate.languageSub$.subscribe((lang) => {
      this.renderer.setAttribute(this.document.documentElement, 'lang', lang);
    });
  }

  // toggleDarkTheme(checked: boolean) {
  //   // this.themeService.setDarkTheme(checked);
  //   // this.isDarkTheme = of(checked);
  // }
}
