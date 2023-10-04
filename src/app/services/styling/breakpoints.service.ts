import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, isDevMode } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BREAKPOINTS_APP } from 'src/app/shared/constants';

@Injectable({
  providedIn: 'root',
})
export class BreakpointsService {
  private isMobileSmall = new BehaviorSubject<boolean>(false);
  private isMobileLarge = new BehaviorSubject<boolean>(false);
  private isTablet = new BehaviorSubject<boolean>(false);
  private isDesktop = new BehaviorSubject<boolean>(false);

  isMobileSmall$ = this.isMobileSmall.asObservable();
  isMobileLarge$ = this.isMobileLarge.asObservable();
  isTablet$ = this.isTablet.asObservable();
  isDesktop$ = this.isDesktop.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
      window.addEventListener('resize', () => {
        this.checkScreenSize();
      });
    }
  }

  private checkScreenSize() {
    const width = window.innerWidth;

    this.isMobileSmall.next(width < BREAKPOINTS_APP.small);
    this.isMobileLarge.next(width >= BREAKPOINTS_APP.small && width < BREAKPOINTS_APP.medium);
    this.isTablet.next(width >= BREAKPOINTS_APP.medium && width <= BREAKPOINTS_APP.large);
    this.isDesktop.next(width >= BREAKPOINTS_APP.large);

    isDevMode() && this.logBreakpointsInfo(width);
  }

  private logBreakpointsInfo(width: number) {
    console.log(
      '\x1b[35m%s\x1b[0m',
      `breakpoints.service H11:01 L38: 'isMobileSmall'`,
      width,
      this.isMobileSmall.value,
    );
    console.log(
      '\x1b[35m%s\x1b[0m',
      `breakpoints.service H11:01 L38: 'isMobileLarge'`,
      width,
      this.isMobileLarge.value,
    );
    console.log(
      '\x1b[35m%s\x1b[0m',
      `breakpoints.service H11:01 L38: 'isTablet'`,
      width,
      this.isTablet.value,
    );
    console.log(
      '\x1b[35m%s\x1b[0m',
      `breakpoints.service H11:01 L38: 'isDesktop'`,
      width,
      this.isDesktop.value,
    );
  }
}
