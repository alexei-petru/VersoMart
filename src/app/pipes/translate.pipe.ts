import { Pipe, PipeTransform, Signal, effect } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslateService } from '../services/translate.service';

@Pipe({
  name: 'translate',
})
export class TranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}
  transform(key: string) {
    const allTranslationData = this.translate.translationsSub$();
    return allTranslationData[key] || key;
  }
}
