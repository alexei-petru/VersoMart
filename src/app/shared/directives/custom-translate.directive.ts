import { Directive, Input, ElementRef, OnInit, OnChanges } from '@angular/core';
import { AppTranslateService } from '../../services/app-translate.service';
import { TranslateService } from '@ngx-translate/core';
import { Translations } from '../models';

@Directive({
  selector: '[customTranslate]',
})
export class CustomTranslateDirective {
  @Input('customTranslate') key: string = '';
  private apiTranslation: Translations | undefined;

  constructor(private el: ElementRef, private appTranslate: AppTranslateService, private translate: TranslateService) {
    this.appTranslate.translationsSub$.subscribe((res) => {
      this.apiTranslation = res;
      this.translateContent();
    });
  }

  ngOnInit() {
    this.translateContent();
  }

  private translateContent() {
    if (!this.key) return;

    const fromApiState = this.getTranslationFromApiState(this.key);
    if (fromApiState) {
      this.el.nativeElement.innerHTML = fromApiState;
    } else {
      this.translate.get(this.key).subscribe((translation) => {
        this.el.nativeElement.innerHTML = translation;
      });
    }
  }

  private getTranslationFromApiState(key: string): string | null | undefined {
    if (!this.apiTranslation) return;
    return this.apiTranslation.keys[key];
  }
}
