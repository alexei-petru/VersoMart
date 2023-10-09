import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PlatformService } from 'src/app/services/platform.service';
import { RouteStateService } from 'src/app/services/route-state.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { BreakpointsCustomService } from 'src/app/services/styling/breakpoints-custom.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuth$ = this.authService.isAuth$;
  isAuthPage$ = this.routeState.isAuthPage$;
  isSidenav$ = this.sidenavService.isSidenav$;
  isLessThanMediumLarge$ = this.breakpointsCustomService.isLessThanMediumLarge$;
  isLessThanSmallMedium$ = this.breakpointsCustomService.isLessThanSmallMedium$;
  isLessThanSmall$ = this.breakpointsCustomService.isLessThanSmall$;
  isSSRTemp$ = this.platformService.isSSR;

  constructor(
    private platformService: PlatformService,
    private sidenavService: SidenavService,
    private authService: AuthService,
    private routeState: RouteStateService,
    private breakpointsCustomService: BreakpointsCustomService,
  ) {}

  scrollToTop() {
    window.scrollTo();
  }

  toggleSideNav() {
    this.sidenavService.toggle();
  }
}
