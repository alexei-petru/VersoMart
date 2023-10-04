import { Component, Renderer2 } from '@angular/core';
import { ThemeService } from 'src/app/services/styling/theme.service';
import { ThemeApp } from '../../constants';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-theme-select',
  templateUrl: './theme-select.component.html',
  styleUrls: ['./theme-select.component.scss'],
})
export class ThemeSelectComponent {
  currentTheme$ = this.themeService.currentTheme$;
  themesAllAppArray$ = this.themeService.themesAllAppArray$;

  constructor(
    private themeService: ThemeService,
    private renderer: Renderer2,
  ) {}

  setTheme(themeSelectEvent: MatSelectChange): void {
    const currentTheme = themeSelectEvent.value as ThemeApp;
    this.themeService.setTheme(currentTheme, this.renderer);
  }
}
