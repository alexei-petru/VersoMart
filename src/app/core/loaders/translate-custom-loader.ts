import { isPlatformServer } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID, TransferState } from '@angular/core';
import { TranslationsKeys } from '@app/core/models/types';
import { REQUESTED_LANGUAGE_KEY } from '@app/core/transfer-state-keys';
import { TranslateLoader } from '@ngx-translate/core';
import { all } from 'deepmerge';
import { Observable, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private transferState: TransferState,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {}
  getTranslation(lang: string): Observable<TranslationsKeys> {
    // const languageServerKey = this.getLanguageKeyFromServerState();
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

  // private getLanguageKeyFromServerState() {
  //   const requestUrlLanguage = this.transferState.get(REQUESTED_LANGUAGE_KEY, null);
  //   return requestUrlLanguage;
  // }
}
