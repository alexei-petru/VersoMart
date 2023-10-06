import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, Renderer2, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, of } from 'rxjs';
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
  @ViewChild('snav') public sidenav!: MatSidenav;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private AppTranslate: LanguageService,
    private sidenavService: SidenavService,
    private themeService: ThemeService,
  ) {
    this.updatePageLang();
    this.themeService.setDefaultTheme(this.renderer);
  }

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
  }

  private updatePageLang() {
    this.AppTranslate.languageApp$.subscribe((langObj) => {
      this.renderer.setAttribute(this.document.documentElement, 'lang', langObj.value);
    });
  }
}
