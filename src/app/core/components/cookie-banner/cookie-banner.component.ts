import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CookieAppService } from 'src/app/services/cookie-app.service';
import { CookieAgreementModalComponent } from './cookie-agreement-modal/cookie-agreement-modal.component';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss'],
})
export class CookieBannerComponent {
  constructor(
    private cookieBannerService: CookieAppService,
    private matDialog: MatDialog,
  ) {}

  acceptCookie() {
    this.cookieBannerService.acceptCookies();
  }

  denyCookie() {
    this.cookieBannerService.denyCookies();
  }

  openCookieConsentModal() {
    this.matDialog.open(CookieAgreementModalComponent);
  }
}
