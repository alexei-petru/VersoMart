import { Inject, Injectable } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class PlatformService {
  isSSR: boolean;
  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isSSR = isPlatformServer(this.platformId);
    this.isSSR = !isPlatformBrowser(this.platformId);
  }
}
