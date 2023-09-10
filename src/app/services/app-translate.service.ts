import { Injectable, WritableSignal, signal } from '@angular/core';
import { ApiService } from './api.service';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Subject, catchError, map, of } from 'rxjs';
import { SnackbarData, Translations } from '../shared/models';
import { defaultLanguage, languagesCode } from '../shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../shared/components/snack-bar/snack-bar.component';

@Injectable({
  providedIn: 'root',
})
export class AppTranslateService {
  translationsSub$ = new BehaviorSubject<Translations | undefined>(undefined);
  languageSub$ = new BehaviorSubject(defaultLanguage.code);

  constructor(private apiService: ApiService, private translate: TranslateService, private snackbar: MatSnackBar) {}

  setInitialTranslations() {
    this.setLocalTranslation();
    this.setTranslationFromApi(this.languageSub$.value);
  }

  private setTranslationFromApi(lang: string) {
    this.apiService
      .getLangTranslations(lang)
      .pipe(
        catchError((err) => {
          return this.translate.getTranslation(lang).pipe(
            map((translationKeys) => {
              this.snackbar.openFromComponent(SnackBarComponent, {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom',
                data: { message: 'Translation Error' } as SnackbarData,
              });
              return { lang: lang, keys: translationKeys };
            })
          );
        })
      )
      .subscribe((res) => {
        this.translationsSub$.next(res);
      });
  }

  private setLocalTranslation() {
    this.translate.addLangs(languagesCode);
    this.translate.setDefaultLang(defaultLanguage.code);
    const browserLang = this.translate.getBrowserLang();
    const languageRegex = new RegExp(languagesCode.join('|'));
    this.translate.use(browserLang?.match(languageRegex) ? browserLang : defaultLanguage.code);
  }

  changeTranslations(lang: string) {
    this.translate.use(lang);
    this.languageSub$.next(lang);
    this.setTranslationFromApi(lang);
  }
}
