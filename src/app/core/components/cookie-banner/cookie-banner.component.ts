import { Component } from '@angular/core';
import { CookieAppService } from 'src/app/services/cookie-app.service';

@Component({
  selector: 'app-cookie-banner',
  templateUrl: './cookie-banner.component.html',
  styleUrls: ['./cookie-banner.component.scss'],
})
export class CookieBannerComponent {
  constructor(private cookieBannerService: CookieAppService) {}

  acceptCookie() {
    this.cookieBannerService.acceptCookies();
  }

  denyCookie() {
    this.cookieBannerService.denyCookies();
  }
}
