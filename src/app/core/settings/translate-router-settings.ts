import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LocalizeRouterSettings } from '@gilsdav/ngx-translate-router';

@Injectable({
  providedIn: 'root',
})
export class MyLocalizeRouterSettings extends LocalizeRouterSettings {
  constructor(private translate: TranslateService) {
    super();
  }

  override defaultLangFunction = (
    langs: string[],
    cachedLang?: string,
    browserLang?: string,
  ): string => {
    return cachedLang || browserLang || 'en';
  };
}
