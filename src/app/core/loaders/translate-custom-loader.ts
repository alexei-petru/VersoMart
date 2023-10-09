import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, zip } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { all } from 'deepmerge';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { SnackbarData, TranslationsKeys } from 'src/app/shared/models/types';
import { environment } from 'src/environments/environment';

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
        this.displaySnackbar();
        return localTrans$;
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
