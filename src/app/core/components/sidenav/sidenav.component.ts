import { Component } from '@angular/core';
import { RouteStateService } from 'src/app/services/route-state.service';
import { BreakpointsCustomService } from 'src/app/services/styling/breakpoints-custom.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  isLessThanMediumLarge$ = this.breakpointsCustomService.isLessThanMediumLarge$;
  isLessThanSmallMedium$ = this.breakpointsCustomService.isLessThanSmallMedium$;
  isLessThanSmall$ = this.breakpointsCustomService.isLessThanSmall$;
  isAuthPage$ = this.routeStateService.isAuthPage$;
  constructor(
    private breakpointsCustomService: BreakpointsCustomService,
    private routeStateService: RouteStateService,
  ) {}
}
