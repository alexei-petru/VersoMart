import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { BREAKPOINTS_CUSTOM_APP } from 'src/app/shared/models/constants';

@Injectable({
  providedIn: 'root',
})
export class BreakpointsCustomService {
  isLessThanSmallMedium$ = this.breakpointObserver
    .observe([`(max-width: ${BREAKPOINTS_CUSTOM_APP.smallMedium}px)`])
    .pipe(map((res) => res.matches));
  isLessThanMediumLarge$ = this.breakpointObserver
    .observe([`(max-width: ${BREAKPOINTS_CUSTOM_APP.mediumLarge}px)`])
    .pipe(map((res) => res.matches));
  isLessThanSmall$ = this.breakpointObserver
    .observe([`(max-width: ${BREAKPOINTS_CUSTOM_APP.small}px)`])
    .pipe(map((res) => res.matches));

  constructor(private breakpointObserver: BreakpointObserver) {}
}
