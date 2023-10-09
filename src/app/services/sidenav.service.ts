import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BehaviorSubject } from 'rxjs';
import { BREAKPOINTS_CUSTOM_APP } from '../shared/models/constants';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private sidenav!: MatSidenav;
  private isSidenav = new BehaviorSubject(false);
  isSidenav$ = this.isSidenav.asObservable();
  private isSidenavAuthBtns = new BehaviorSubject(false);
  isSidenavAuthBtns$ = this.isSidenav.asObservable();

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
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
}
