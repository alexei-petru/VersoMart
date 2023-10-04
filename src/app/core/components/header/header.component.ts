import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { PlatformService } from 'src/app/services/platform.service';
import { SidenavService } from 'src/app/services/sidenav.service';
import { BreakpointsService } from 'src/app/services/styling/breakpoints.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  panelOpenState = false;
  isTablet$ = this.breakpointsService.isTablet$;
  isDesktop$ = this.breakpointsService.isDesktop$;
  isSSRTemp$ = this.platformService.isSSR;
  isAuthPage$ = true;

  constructor(
    private appTranslateService: LanguageService,
    private breakpointsService: BreakpointsService,
    private platformService: PlatformService,
    private sidenavService: SidenavService,
  ) {}

  scrollToTop() {
    window.scrollTo();
  }

  toggleSideNav() {
    this.sidenavService.toggle();
  }
}
