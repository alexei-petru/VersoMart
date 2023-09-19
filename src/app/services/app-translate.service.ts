import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, filter, merge, startWith } from 'rxjs';
import { Languages } from '../shared/constants';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  languageSub$ = new BehaviorSubject<Languages>(this.translate.currentLang as Languages);
  constructor(
    private translate: TranslateService,
    private translateRoute: LocalizeRouterService,
    private router: Router,
    private metaTitle: Title,
    private metaService: Meta,
    private activatedRoute: ActivatedRoute,
  ) {
    this.onLangChangeUpdateMetaData();
  }
  public setLang(lang: Languages) {
    this.languageSub$.next(lang);
    this.translateRoute.changeLanguage(lang);
  }

  private onLangChangeUpdateMetaData() {
    merge(
      this.translate.onLangChange.pipe(startWith(null)),
      this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    ).subscribe(() => {
      let currentRoute = this.activatedRoute.root;
      while (currentRoute.firstChild) {
        currentRoute = currentRoute.firstChild;
      }

      const routeData = currentRoute.snapshot.data;
      if (routeData) {
        const titleKey = `${routeData['routeKey']}.META_TITLE`;
        const descriptionKey = `${routeData['routeKey']}.META_DESCRIPTION`;
        if (!routeData['routeKey']) return;
        this.translate.get([titleKey, descriptionKey]).subscribe((res) => {
          const titleVal = res[titleKey];
          const descriptionVal = res[descriptionKey];
          this.metaTitle.setTitle(titleVal);
          this.metaService.updateTag({ name: 'description', content: descriptionVal });
        });
      }
    });
  }
}
