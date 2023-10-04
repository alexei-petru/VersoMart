import { Injectable, Renderer2 } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { THEMES_ALL_APP, ThemeApp, ThemesAllApp } from 'src/app/shared/constants';
import { PlatformService } from '../platform.service';

@Injectable()
export class ThemeService {
  private themesAllApp = new BehaviorSubject<ThemesAllApp>(THEMES_ALL_APP);
  private themeApp = new BehaviorSubject<ThemeApp>(THEMES_ALL_APP.light);
  themesAllAppArray$ = this.themesAllApp.asObservable().pipe(map((obj) => Object.values(obj)));
  themesAllApp$ = this.themesAllApp.asObservable();
  currentTheme$ = this.themeApp.asObservable();

  constructor(private platform: PlatformService) {}

  setTheme(currentTheme: ThemeApp, renderer: Renderer2): void {
    this.themeApp.next(currentTheme);
    Object.values(THEMES_ALL_APP).forEach((themeObject) => {
      if (themeObject.className === currentTheme.className) {
        renderer.addClass(document.body, themeObject.className);
      } else {
        renderer.removeClass(document.body, themeObject.className);
      }
    });
  }

  public setDefaultTheme(renderer: Renderer2) {
    if (!this.platform.isSSR) renderer.addClass(document.body, this.themeApp.value.className);
  }
}
