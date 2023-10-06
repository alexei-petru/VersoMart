import { Component } from '@angular/core';
import { BreakpointsCustomService } from 'src/app/services/styling/breakpoints-custom.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  isLessThanMediumLarge$ = this.breakpointsCustomService.isLessThanMediumLarge$;
  isLessThanSmallMedium$ = this.breakpointsCustomService.isLessThanSmallMedium$;
  constructor(private breakpointsCustomService: BreakpointsCustomService) {}
}
