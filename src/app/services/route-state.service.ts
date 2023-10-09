import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouteStateService {
  public isAuthPage$ = this.createRouteDataSubject('isAuthPage');
  public isHomePage$ = this.createRouteDataSubject('isHomePage');

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  private createRouteDataSubject(routeDataKey: string) {
    const dataSubject = new BehaviorSubject(false);

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
      )
      .subscribe(() => {
        let route = this.activatedRoute;
        while (route.firstChild) route = route.firstChild;
        route.data.subscribe((data) => {
          const isDataKey = !!data[routeDataKey];
          dataSubject.next(isDataKey);
        });
      });

    return dataSubject;
  }
}
