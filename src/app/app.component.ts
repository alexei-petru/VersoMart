import { Component, OnInit } from '@angular/core';
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
  constructor(private appTranslate: AppTranslateService) {
    appTranslate.setInitialTranslations();
  }

  
  // constructor(private themeService: ThemeService) {}

  // ngOnInit() {
  //   this.isDarkTheme = this.themeService.isDarkTheme;
  // }

  toggleDarkTheme(checked: boolean) {
    // this.themeService.setDarkTheme(checked);
    // this.isDarkTheme = of(checked);
  }
}
