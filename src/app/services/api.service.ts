import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Translations } from '../shared/models/types';

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

  getCategories(lang: string) {
    const categoriesUrl = this.apiUrl + '/api/products/categories?lang=' + lang;
    return this.http.get(categoriesUrl, this.requestOptions);
  }

  getAllProducts() {
    const productUrl = this.apiUrl + '/api/products/all';
    return this.http.get(productUrl, this.requestOptions);
  }

  // setHeaders() {
  //   combineLatest([
  //     this.store.select(fromRoot.getLang),
  //     this.store.select(fromRoot.getUser),
  //   ]).subscribe(([lang, user]) => {
  //     if (user && user.accessToken && isPlatformBrowser(this.platformId)) {
  //       localStorage.setItem(accessTokenKey, user.accessToken);
  //     }
  //     const accessToken = isPlatformBrowser(this.platformId)
  //       ? localStorage.getItem(accessTokenKey)
  //       : '';
  //     let headers = new HttpHeaders();
  //     headers = headers.set('Authorization', 'Bearer ' + accessToken).set('lang', lang);
  //     this.requestOptions = { headers, withCredentials: true };
  //   });
  // }
}
