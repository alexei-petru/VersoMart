import { Location } from '@angular/common';
import { Component, Renderer2 } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { ThemeService } from 'src/app/services/styling/theme.service';
import { DropdownOption } from 'src/app/shared/components/dropdown/dropdown.component';
import { LanguageApp, ThemeApp } from '@app/core/models/constants';

@Component({
  selector: 'app-quick-settings',
  templateUrl: './quick-settings.component.html',
  styleUrls: ['./quick-settings.component.scss'],
})
export class QuickSettingsComponent {
  currentTheme$ = this.themeService.currentTheme$;
  themesAllAppArray$ = this.themeService.themesAllAppArray$;
  themeIconName = 'palette';

  currentLang$ = this.appTranslateService.languageApp$;
  languageAllAppArr$ = this.languageService.languagesAllAppArr$;
  languageIconName = 'language';

  currentUrl!: string;

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
    private renderer: Renderer2,
    private appTranslateService: LanguageService,
    private location: Location,
  ) {}

  setTheme(themeSelectObj: DropdownOption): void {
    this.themeService.setTheme(themeSelectObj as ThemeApp, this.renderer);
  }

  setLang(langObj: DropdownOption): void {
    this.appTranslateService.setLang(langObj as LanguageApp, this.location.path());
  }
}
