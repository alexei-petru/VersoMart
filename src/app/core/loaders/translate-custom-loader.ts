import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { all } from 'deepmerge';
import { Observable, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { TranslationsKeys } from 'src/app/shared/models/types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
  ) {}
  getTranslation(lang: string): Observable<TranslationsKeys> {
    const apiTrans$ = this.apiService.getLangTranslations(lang);
    const localTrans$ = this.http.get<TranslationsKeys>(
      `${environment.ssrUrl}/assets/i18n/${lang}.json`,
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
