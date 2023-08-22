import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Observable, of } from 'rxjs';
import { AppTranslateService } from '../../services/app-translate.service';
@Pipe({
  name: 'customTranslate',
  pure: true,
})
export class CustomTranslate implements PipeTransform {
  apiTranslation: any;
  constructor(private appTranslate: AppTranslateService, private translate: TranslateService) {
    this.appTranslate.translationsSub$.subscribe((res) => {
      this.apiTranslation = res;
    });
  }

  transform(key: string, params?: any): Observable<string> {
    const fromState: any = this.getTranslationFromState(key, params);
    if (fromState) {
      return of(fromState);
    }

    return this.translate.get(key, params);
  }

  private getTranslationFromState(key: string, params?: any): string | null | undefined {
    if (!this.apiTranslation) return;
    return this.apiTranslation.keys[key];
  }
}
