import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { SnackbarData, Translations } from 'src/app/shared/models';

export class CustomTranslateLoader implements TranslateLoader {
  constructor(
    private http: HttpClient,
    private apiService: ApiService,
    private snackbar: MatSnackBar,
  ) {}

  getTranslation(lang: string): Observable<any> {
    return this.apiService.getLangTranslations(lang).pipe(
      mergeMap((apiTrans: Translations) =>
        this.http
          .get(`assets/i18n/${lang}.json`)
          .pipe(map((localTrans) => ({ ...apiTrans.keys, ...localTrans }))),
      ),
      catchError((err) => {
        this.displaySnackbar();
        return this.http.get(`assets/i18n/${lang}.json`);
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
