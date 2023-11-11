import { AfterViewInit, Component, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CookieAppService } from './services/cookie-app.service';
import { LanguageService } from './services/language.service';
import { SidenavService } from './services/sidenav.service';
import { ThemeService } from './services/styling/theme.service';

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
    private sidenavService: SidenavService,
    private themeService: ThemeService,
    private language: LanguageService,
    private cookieBannerService: CookieAppService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.authService.setActor();
    this.language.initTranslationLanguage(this.renderer);
    this.themeService.setDefaultTheme(this.renderer);
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }
}
