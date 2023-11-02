import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { all } from 'deepmerge';
import { Observable, zip } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { TranslationsKeys } from '@app/core/models/types';
import { environment } from 'src/environments/environment';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}
  getTranslation(lang: string): Observable<TranslationsKeys> {
    if (isPlatformServer(this.platformId)) {
      console.log(
        '\x1b[35m%s\x1b[0m',
        `translate-custom-loader H17:34 L23: 'loader translation lang'`,
        lang,
      );
      const localTransTemp$ = this.http.get<TranslationsKeys>(
        `${environment.hostUrl}/assets/i18n/${lang}.json`,
      );
      localTransTemp$.subscribe((res) => {
        console.log(
          '\x1b[35m%s\x1b[0m',
          `translate-custom-loader H17:37 L31: 'ssr translation'`,
          res,
        );
      });
    }
    const apiTrans$ = this.apiService.getLangTranslations(lang);
    const localTrans$ = this.http.get<TranslationsKeys>(
      `${environment.hostUrl}/assets/i18n/${lang}.json`,
    );
    return zip([apiTrans$, localTrans$]).pipe(
      map(([apiTrans, localTrans]) => {
        const transLocalAndApiMerged = all([localTrans, apiTrans.keys]) as TranslationsKeys;
        return transLocalAndApiMerged as TranslationsKeys;
      }),
      catchError(() => {
        return localTrans$;
      }),
    );
  }
}
