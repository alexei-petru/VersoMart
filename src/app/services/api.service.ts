import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Translations } from '../shared/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;
  requestOptions = {};
  constructor(private http: HttpClient) {}

  getLangTranslations(lang: string) {
    const translationsUrl = this.apiUrl + '/api/translations?lang=' + lang;
    return this.http.get<Translations>(translationsUrl);
  }

  // editTranslation({ lang, keys }) {
  //   const translationsUpdateUrl = this.apiUrl + '/api/translations?lang=' + lang;
  //   return this.http.patch(translationsUpdateUrl, { keys: keys }, this.requestOptions);
  // }

  // editAllTranslation(translations: Translations[]) {
  //   const translationsUpdateUrl = this.apiUrl + '/api/translations/all';
  //   return this.http.patch(translationsUpdateUrl, translations, this.requestOptions);
  // }

  // setHeaders() {
  //   combineLatest([this.store.select(fromRoot.getLang), this.store.select(fromRoot.getUser)]).subscribe(
  //     ([lang, user]) => {
  //       if (user && user.accessToken && isPlatformBrowser(this.platformId)) {
  //         localStorage.setItem(accessTokenKey, user.accessToken);
  //       }
  //       const accessToken = isPlatformBrowser(this.platformId) ? localStorage.getItem(accessTokenKey) : '';
  //       let headers = new HttpHeaders();
  //       headers = headers.set('Authorization', 'Bearer ' + accessToken).set('lang', lang);
  //       this.requestOptions = { headers, withCredentials: true };
  //     },
  //   );
  // }
}
