import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppTranslateService } from './services/app-translate.service';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'VersoMart';
  isDarkTheme: Observable<boolean> = of(false);
  constructor() {}

  // constructor(private themeService: ThemeService) {}

  // ngOnInit() {
  //   this.isDarkTheme = this.themeService.isDarkTheme;
  // }

  toggleDarkTheme(checked: boolean) {
    // this.themeService.setDarkTheme(checked);
    // this.isDarkTheme = of(checked);
  }
}
