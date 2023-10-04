import { Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointsService } from 'src/app/services/styling/breakpoints.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  isMobileSmall = toSignal(this.breakpointsService.isMobileSmall$);
  isMobileLarge = toSignal(this.breakpointsService.isMobileLarge$);
  isTablet = toSignal(this.breakpointsService.isTablet$);
  isDesktop = toSignal(this.breakpointsService.isDesktop$);

  constructor(private breakpointsService: BreakpointsService) {}
}
