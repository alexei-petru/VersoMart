import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, of } from 'rxjs';
import { LanguageService } from './services/language.service';
import { SidenavService } from './services/sidenav.service';
import { ThemeService } from './services/styling/theme.service';
import { CookieAppService } from './services/cookie-app.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'VersoMart';
  isDarkTheme: Observable<boolean> = of(false);
  isCookieDisplayed$ = this.cookieBannerService.isCookieDisplayed$;
  @ViewChild('snav') public sidenav!: MatSidenav;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private appTranslate: LanguageService,
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private language: LanguageService,
    private cookieBannerService: CookieAppService,
    private authService: AuthService,
  ) {
    this.authService.setActor();
    this.language.initTranslationLanguage();
    this.updatePageLang();
    this.themeService.setDefaultTheme(this.renderer);
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  private updatePageLang() {
    this.appTranslate.languageApp$.subscribe((langObj) => {
      this.renderer.setAttribute(this.document.documentElement, 'lang', langObj.value);
    });
  }
}
