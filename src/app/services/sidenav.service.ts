import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject, Subscription } from 'rxjs';
import { BREAKPOINTS_CUSTOM_APP } from '../core/models/constants';

@Injectable({
  providedIn: 'root',
})
export class SidenavService implements OnDestroy {
  private sidenav!: MatSidenav;
  private isSidenav = new BehaviorSubject(false);
  isSidenav$ = this.isSidenav.asObservable();
  isSidenavAuthBtns$ = this.isSidenav.asObservable();
  breakpointSub: Subscription;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointSub = this.breakpointObserver
      .observe(`(max-width:${BREAKPOINTS_CUSTOM_APP.mediumLarge}px)`)
      .subscribe((res) => this.toggleSidenav(res.matches));
  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public toggle(): void {
    this.sidenav.toggle();
  }

  public toggleSidenav(isBtnShow: boolean) {
    this.isSidenav.next(isBtnShow);
    this.sidenav?.close();
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }
}
