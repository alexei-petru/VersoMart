import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { BehaviorSubject, catchError, finalize, of, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';
import { ACCESS_TOKEN_KEY } from '@app/core/models/constants';
import { SignInValidResponse } from '@app/core/models/types';
import { FormControl } from '@angular/forms';

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
  ) {}

  setActor() {
    this.authState.next({ ...this.authState.value, loading: true });
    const accessToken = this.ssrCookieCustomService.get(ACCESS_TOKEN_KEY);
    if (accessToken) {
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

  private setInitActorState(userObj: SignInValidResponse) {
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
        this.ssrCookieCustomService.setNew(false, ACCESS_TOKEN_KEY, res.accessToken);
      }),
      finalize(() => {
        this.authState.next({ ...this.authState.value, loading: false });
      }),
    );
  }

  // logout(email: string, password: string) {
  //   // return this.apiService.signIn({ email, password });
  // }

  getFormErrorMessageKey(formControl: FormControl): string {
    if (formControl.hasError('required')) {
      return 'formErrors.required';
    }
    if (formControl.hasError('email')) {
      return 'formErrors.email';
    }
    if (formControl.hasError('invalidCredentials')) {
      return 'formErrors.invalidCredentials';
    }
    return 'formErrors.invalid';
  }

  // private getApiErrorKey(errMsg: string) {
  //   if (errMsg === 'Invalid credential') {
  //     return 'apiErrors.invalidCredentials';
  //   }
  //   return errMsg;
  // }
  // initAuth() {
  //   const accesToken = this.ssrCookieCustomService.get(ACCESS_TOKEN_KEY);
  // }

  // setAuth() {
  //   this.ssrCookieCustomService.setNew(false, ACCESS_TOKEN_KEY);
  // }
}
