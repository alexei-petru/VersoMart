import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { ApiService } from '@app/services/api.service';
import { environment } from 'environment.prod';

@Injectable({
  providedIn: 'root',
})
export class HttpVerifyService {
  apiUrl = environment.apiUrl;
  requestOptions = {};
  constructor(
    private apiService: ApiService,
    private ssrCookieCustomService: SsrCookieCustomService,
    private http: HttpClient,
  ) {
    // this.testInMemory();
    // this.testGetUser();
    // this.setHeaders();
  }

  private testInMemory() {
    this.apiService.signIn({ email: '', password: '' }).subscribe((res) => {
      // console.log(
      //   '\x1b[35m%s\x1b[0m',
      //   `http-verify.service H13:55 L27: 'httpTest translations'`,
      //   res,
      // );
    });
  }

  private testGetUser() {
    this.apiService.getUser().subscribe((res) => {
      console.log('\x1b[35m%s\x1b[0m', `http-verify.service H13:01 L23: 'getUser'`);
    });
  }

  initService(): Promise<unknown> {
    return new Promise((resolve) => {
      resolve(true);
    });
  }

  // private setHeaders() {
  //   const accessToken = this.ssrCookieCustomService.get(ACCESS_TOKEN_KEY) || null;
  //   let headers = new HttpHeaders();
  //   headers = headers
  //     .set('Authorization', 'Bearer ' + accessToken)
  //     .set('lang', LANGUAGE_APP_DEFAULT.value);
  //   this.requestOptions = { headers, withCredentials: true };
  // }
}
