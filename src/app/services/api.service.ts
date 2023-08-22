import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Translations } from '../shared/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getLangTranslations(lang: string) {
    const translationsUrl = this.apiUrl + '/api/translations?lang=' + lang;
    return this.http.get<Translations>(translationsUrl);
  }
}
