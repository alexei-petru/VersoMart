import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { LanguageService } from './services/language.service';
import { PlatformService } from './services/platform.service';
import { SidenavService } from './services/sidenav.service';
import { ThemeService } from './services/styling/theme.service';
import { CookieAppService } from './services/cookie-app.service';

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
    private snackbar: MatSnackBar,
    private themeService: ThemeService,
    private language: LanguageService,
    private platfrom: PlatformService,
    private cookieBannerService: CookieAppService,
  ) {
    this.language.initLang();
    this.updatePageLang();
    this.themeService.setDefaultTheme(this.renderer);
    this.isCookieDisplayed$.subscribe((res) => {
      console.log('\x1b[35m%s\x1b[0m', `app.component H09:19 L38: 'isCookdispl'`, res);
    });
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
