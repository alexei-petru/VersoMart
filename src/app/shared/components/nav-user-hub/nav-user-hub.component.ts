import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from '@app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-nav-user-hub',
  templateUrl: './nav-user-hub.component.html',
  styleUrls: ['./nav-user-hub.component.scss'],
})
export class NavUserHubComponent {
  constructor(
    private authService: AuthService,
    private appTranslateService: LanguageService,
  ) {}

  @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger | null = null;
  lang$ = this.appTranslateService.languageApp$;
  authState$ = this.authService.authState$;

  closeMenu() {
    if (this.menuTrigger) this.menuTrigger.closeMenu();
  }

  signOut() {
    this.authService.signOut();
  }
}
