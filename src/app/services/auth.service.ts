import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { ACCESS_TOKEN_EXPIRES_DAYS, ACCESS_TOKEN_KEY } from '@app/core/models/constants';
import {
  GetUserResponse,
  SignInFormInputs,
  SignInValidResponse,
  SignUpFormInputs,
} from '@app/core/models/types';
import { BehaviorSubject, catchError, finalize, tap, throwError } from 'rxjs';
import { ApiService } from './api.service';

interface AuthState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;
  loading: boolean;
  userDetails: SignInValidResponse | null;
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
  });

  authState$ = this.authState.asObservable();

  constructor(
    private apiService: ApiService,
    private ssrCookieCustomService: SsrCookieCustomService,
  ) {}

  setActor(accessToken?: string) {
    const cookieAccessToken = accessToken
      ? accessToken
      : this.ssrCookieCustomService.get(ACCESS_TOKEN_KEY);
    if (cookieAccessToken) {
      this.authState.next({ ...this.authState.value, loading: true });
      this.apiService
        .getUser()
        .pipe(
          catchError((errObj) => {
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

  signIn(sigInFormValues: SignInFormInputs) {
    return this.apiService.signIn(sigInFormValues).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      }),
      tap((res) => {
        if (res.accessToken) {
          this.reinitActor(res.accessToken);
        }
      }),
    );
  }

  signUp(formValues: SignUpFormInputs) {
    return this.apiService.signUp(formValues).pipe(
      tap(() => {
        this.signOut();
      }),
      catchError((err: HttpErrorResponse) => {
        return throwError(() => err);
      }),
    );
  }

  signOut() {
    this.ssrCookieCustomService.delete(ACCESS_TOKEN_KEY);
    this.authState.next({
      isAuthenticated: false,
      isAdmin: false,
      isUser: false,
      loading: false,
      userDetails: null,
    });
  }

  private reinitActor(accessTokenValue: string) {
    this.signOut();
    this.ssrCookieCustomService.setNew(
      false,
      ACCESS_TOKEN_KEY,
      accessTokenValue,
      ACCESS_TOKEN_EXPIRES_DAYS,
      '/',
      undefined,
      true,
      'Strict',
    );
    this.setActor(accessTokenValue);
  }
}
