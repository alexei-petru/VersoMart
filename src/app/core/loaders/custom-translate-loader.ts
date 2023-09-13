import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { SnackbarData, Translations, TranslationsKeys } from 'src/app/shared/models';
import { all } from 'deepmerge';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private snackbar: MatSnackBar,
  ) {}
  getTranslation(lang: string): Observable<TranslationsKeys> {
    return this.apiService.getLangTranslations(lang).pipe(
      mergeMap((apiTrans: Translations) =>
        this.http.get<TranslationsKeys>(`assets/i18n/${lang}.json`).pipe(
          map((localTrans) => {
            const isTransDifferent = JSON.stringify(apiTrans.keys) !== JSON.stringify(localTrans);
            if (isTransDifferent) {
              const transLocalAndApiMerged = all([localTrans, apiTrans.keys]);
              return transLocalAndApiMerged as TranslationsKeys;
            } else {
              return localTrans;
            }
          }),
        ),
      ),
      catchError((err) => {
        this.displaySnackbar();
        return this.http.get<TranslationsKeys>(`assets/i18n/${lang}.json`);
      }),
    );
  }

  private displaySnackbar() {
    this.snackbar.openFromComponent(SnackBarComponent, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data: { message: 'Translation Server Error,Used local translation' } as SnackbarData,
    });
  }
}
