import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PlatformService } from 'src/app/services/platform.service';
import { RouteStateService } from 'src/app/services/route-state.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { ThemeService } from 'src/app/services/styling/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isAuth$ = this.authService.isAuth$;
  isAuthPage$ = this.routeState.isAuthPage$;
  isSidenav$ = this.sidenavService.isSidenav$;
  isSSRTemp$ = this.platformService.isSSR;
  currentTheme$ = this.themeService.currentTheme$;

  constructor(
    private platformService: PlatformService,
    private sidenavService: SidenavService,
    private authService: AuthService,
    private routeState: RouteStateService,
    private themeService: ThemeService,
  ) {}

  scrollToTop() {
    window.scrollTo();
  }

  toggleSideNav() {
    this.sidenavService.toggle();
  }
}
