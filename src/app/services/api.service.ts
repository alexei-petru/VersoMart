import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { environment } from 'environment';
import {
  GetUserResponse,
  SignInFormInputs,
  SignInValidResponse,
  SignUpFormInputs,
  Translations,
} from '../core/models/types';

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
    // this.setHeaders();
  }

  getUser() {
    const userUrl = this.apiUrl + '/api/auth';
    return this.http.get<GetUserResponse>(userUrl, this.requestOptions);
  }

  signIn(sigInFormValues: SignInFormInputs) {
    const sendContact = this.apiUrl + '/api/auth/signin';
    return this.http.post<SignInValidResponse>(sendContact, sigInFormValues, this.requestOptions);
  }

  signUp(req: SignUpFormInputs) {
    const sendContact = this.apiUrl + '/api/auth/signup';
    return this.http.post<void>(sendContact, req, this.requestOptions);
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

  // setHeaders() {
  //   const accessToken = this.ssrCookieCustomService.get(ACCESS_TOKEN_KEY) || null;
  //   let headers = new HttpHeaders();
  //   headers = headers
  //     .set('Authorization', 'Bearer ' + accessToken)
  //     .set('lang', LANGUAGE_APP_DEFAULT.value);
  //   this.requestOptions = { headers, withCredentials: true };
  // }
}
