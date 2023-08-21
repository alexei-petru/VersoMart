import { Injectable, Signal, WritableSignal, signal } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class TranslateService {
  translationsSub$: WritableSignal<{ [key: string]: string }> = signal({
    key: 'value',
  });
  languageSub$ = signal('en');

  constructor(private apiService: ApiService) {
    this.setLanguageTranslation();
  }

  setLanguageTranslation() {
    this.apiService.getLangTranslations(this.languageSub$());
  }

  setLang(lang: string) {}
}
