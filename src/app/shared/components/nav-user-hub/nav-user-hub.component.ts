import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-nav-user-hub',
  templateUrl: './nav-user-hub.component.html',
  styleUrls: ['./nav-user-hub.component.scss'],
})
export class NavUserHubComponent {
  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | null = null;
  lang$ = this.appTranslateService.languageApp$;

  constructor(private appTranslateService: LanguageService) {}

  closeMenu() {
    if (this.menuTrigger) this.menuTrigger.closeMenu();
  }
}
