import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LANGUAGES_ALL_VAL_ARR } from '@app/core/models/constants';
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

  public getUrlWithChangedLang(
    url: string,
    lang: string,
  ): { isNewUrl: boolean; url: string; newOrOldLang: string } {
    const urlParts = url.split('/');
    const languageFragmentPos = urlParts[1];
    if (LANGUAGES_ALL_VAL_ARR.includes(languageFragmentPos) && languageFragmentPos !== lang) {
      urlParts[1] = lang;
      const newUrl = urlParts.join('/');

      return { isNewUrl: true, url: newUrl, newOrOldLang: languageFragmentPos };
    }
    return { isNewUrl: false, url: url, newOrOldLang: lang };
  }
}
