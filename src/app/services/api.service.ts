import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { ACCESS_TOKEN_KEY, LANGUAGE_APP_DEFAULT } from '@app/core/models/constants';
import {
  GetUserResponse,
  SignInValidResponse,
  SignUpFormValues,
  Translations,
} from '../core/models/types';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = environment.apiUrl;
  requestOptions = {};
  constructor(
    private http: HttpClient,
    private ssrCookieCustomService: SsrCookieCustomService,
  ) {
    this.setHeaders();
  }

  getUser() {
    const userUrl = this.apiUrl + '/api/auth';
    return this.http.get<GetUserResponse>(userUrl, this.requestOptions);
  }

  signIn(req: { email: string; password: string }) {
    const sendContact = this.apiUrl + '/api/auth/signin';
    return this.http.post<SignInValidResponse>(sendContact, req, this.requestOptions);
  }

  signUp(req: SignUpFormValues) {
    const sendContact = this.apiUrl + '/api/auth/signup';
    return this.http.post(sendContact, req, this.requestOptions);
  }

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

  setHeaders() {
    const accessToken = this.ssrCookieCustomService.get(ACCESS_TOKEN_KEY) || null;
    let headers = new HttpHeaders();
    headers = headers
      .set('Authorization', 'Bearer ' + accessToken)
      .set('lang', LANGUAGE_APP_DEFAULT.value);
    this.requestOptions = { headers, withCredentials: true };
  }
}
