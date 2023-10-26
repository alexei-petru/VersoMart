import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { ACCESS_TOKEN_KEY } from '@app/core/models/constants';
import { GetUserResponse, SignInValidResponse, SignUpFormValues } from '@app/core/models/types';
import { BehaviorSubject, catchError, finalize, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  loading: boolean;
  userDetails: SignInValidResponse | null;
  errorObj: null | HttpErrorResponse;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    isAdmin: false,
    isUser: false,
    loading: false,
    userDetails: null,
    errorObj: null,
  });

  authState$ = this.authState.asObservable();

  constructor(
    private apiService: ApiService,
    private ssrCookieCustomService: SsrCookieCustomService,
  ) {
    // this.authState$.subscribe((res) => {
    //   console.log('\x1b[35m%s\x1b[0m', `auth.service H16:08 L37: 'autState res'`, res);
    // });
  }

  signUp(formValues: SignUpFormValues) {
    // console.log('\x1b[35m%s\x1b[0m', `auth.service H20:03 L39: 'formValues send'`, formValues);
    this.apiService.signUp(formValues).subscribe((res) => {
      // console.log('\x1b[35m%s\x1b[0m', `auth.service H17:40 L40: 'signUp response'`, res);
    });
  }

  setActor() {
    const accessToken = this.ssrCookieCustomService.get(ACCESS_TOKEN_KEY);
    if (accessToken) {
      this.authState.next({ ...this.authState.value, loading: true });
      this.apiService
        .getUser()
        .pipe(
          catchError((errObj) => {
            this.authState.next({ ...this.authState.value, errorObj: errObj });
            return throwError(() => errObj);
          }),
          finalize(() => {
            this.authState.next({ ...this.authState.value, loading: false });
          }),
        )
        .subscribe((userObj) => {
          this.setInitActorState(userObj);
        });
    }
  }

  private setInitActorState(userObj: GetUserResponse) {
    const isAdmin = userObj.roles.includes('admin');
    const isUser = userObj.roles.includes('user');
    const initialAuth = {
      isAuthenticated: isAdmin || isUser,
      isAdmin: isAdmin,
      isUser: isUser,
      userDetails: userObj,
      errorObj: null,
    };
    this.authState.next({ ...this.authState.value, ...initialAuth });
  }

  resetApiErrorObj() {
    if (this.authState.value.errorObj)
      this.authState.next({ ...this.authState.value, errorObj: null });
  }

  login(email: string, password: string) {
    this.authState.next({ ...this.authState.value, loading: true });
    return this.apiService.signIn({ email, password }).pipe(
      catchError((err: HttpErrorResponse) => {
        this.authState.next({
          ...this.authState.value,
          errorObj: err,
        });
        return throwError(() => err);
      }),
      tap((res) => {
        this.authState.next({ ...this.authState.value, userDetails: res });
        console.log('\x1b[35m%s\x1b[0m', `auth.service H18:19 L99: 'login REs'`, res);
        if (res.accessToken) {
          this.ssrCookieCustomService.setNew(false, ACCESS_TOKEN_KEY, res.accessToken);
        }
      }),
      finalize(() => {
        this.authState.next({ ...this.authState.value, loading: false });
      }),
    );
  }
}
