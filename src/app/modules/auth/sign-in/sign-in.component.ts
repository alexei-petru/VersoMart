import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiErrorsKeys, IMAGES_URL } from '@app/core/models/constants';
import { ApiErrorsArr, SignInFormInputs } from '@app/core/models/types';
import { emailValidators, passwordValidators } from '@app/core/utils/form/validators-list';
import { AuthService } from '@app/services/auth.service';
import { LanguageService } from '@app/services/language.service';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';

export type SignInFormMap<T> = {
  [P in keyof T]: FormControl<T[P]>;
};
export type SignInForm = SignInFormMap<SignInFormInputs>;

export interface ApiErrorObj {
  errorCode: ApiErrorsKeys | undefined;
  errorData: { [key: string]: string } | undefined;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnDestroy {
  pageTitle = 'signInPage';
  languageApp$ = this.languageService.languageApp$;
  signInForm: FormGroup<SignInForm>;
  emailFormControl = new FormControl('', { validators: emailValidators, nonNullable: true });
  passwordControl = new FormControl('', { validators: passwordValidators, nonNullable: true });
  authState$ = this.authService.authState$;
  signInFormSub: Subscription;
  loginSub = new Subscription();
  private commonError = new BehaviorSubject<ApiErrorObj>({
    errorCode: undefined,
    errorData: undefined,
  });
  commonError$ = this.commonError.asObservable();
  isFormLoading = false;
  backgroundImage = IMAGES_URL.signInPage;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.signInForm = this.fb.group<SignInForm>({
      email: this.emailFormControl,
      password: this.passwordControl,
    });

    this.signInFormSub = this.signInForm.valueChanges.subscribe(() => {
      this.commonError.next({
        errorCode: undefined,
        errorData: undefined,
      });
    });
  }

  submitForm() {
    if (this.signInForm.valid) {
      const signInFormValues = this.signInForm.value as SignInFormInputs;
      if (signInFormValues) {
        this.isFormLoading = true;
        this.loginSub = this.authService
          .signIn(signInFormValues)
          .pipe(
            finalize(() => {
              this.isFormLoading = false;
            }),
          )
          .subscribe({
            next: () => {
              this.router.navigateByUrl(this.languageService.getCurrentLang().value);
            },
            error: (errObj: HttpErrorResponse) => {
              this.setApiFormErrors(errObj);
            },
          });
      }
    }
  }

  private setApiFormErrors(errObj: HttpErrorResponse) {
    const errorArr: ApiErrorsArr = errObj.error;
    const lastError = errorArr ? errorArr[errorArr.length - 1] : null;
    if (lastError) {
      this.commonError.next({ errorCode: lastError.errorCode, errorData: lastError.errorData });
      this.signInForm.setErrors({ apiCommonError: true });
    }
  }

  ngOnDestroy() {
    this.signInFormSub?.unsubscribe();
    this.loginSub?.unsubscribe();
  }
}
