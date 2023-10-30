import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMAGES_URL } from '@app/core/models/constants';
import { ApiErrorObj, ApiErrorsArr, SignUpFormInputs } from '@app/core/models/types';
import { emailValidators, passwordValidators } from '@app/core/utils/form/validators-list';
import { AuthService } from '@app/services/auth.service';
import { LanguageService } from '@app/services/language.service';
import { BehaviorSubject, Subscription, finalize } from 'rxjs';

export type SignUpFormMap<T> = {
  [P in keyof T]: FormControl<T[P]>;
};

export type SignUpForm = SignUpFormMap<SignUpFormInputs>;

export const signUpFormKeys = ['email', 'password', 'termsAndPrivacy', 'newsletter'];

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  pageTitle = 'signUpPage';
  languageApp$ = this.languageService.languageApp$;
  signUpForm: FormGroup;
  emailFormControl = new FormControl('', emailValidators);
  passwordControl = new FormControl('', passwordValidators);
  registerSub = new Subscription();
  signUpFormSub: Subscription;
  private commonError = new BehaviorSubject<ApiErrorObj>({
    errorCode: undefined,
    errorData: undefined,
  });
  commonError$ = this.commonError.asObservable();
  isFormLoading = false;
  backgroundImage = IMAGES_URL.signUpPage;

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.signUpForm = this.fb.group<SignUpForm>({
      email: this.emailFormControl,
      password: this.passwordControl,
      termsAndPrivacy: new FormControl(true, Validators.requiredTrue),
      newsletter: new FormControl(false),
    });

    this.signUpFormSub = this.signUpForm.valueChanges.subscribe(() => {
      this.resetErrors();
    });
  }

  private resetErrors() {
    this.commonError.next({
      errorCode: undefined,
      errorData: undefined,
    });
  }

  submitForm() {
    if (this.signUpForm.valid) {
      const signUpFormValues: SignUpFormInputs = this.signUpForm.value;
      if (signUpFormValues) {
        this.isFormLoading = true;
        this.registerSub = this.authService
          .signUp(signUpFormValues)
          .pipe(
            finalize(() => {
              this.isFormLoading = false;
            }),
          )
          .subscribe({
            next: () => {
              this.router.navigateByUrl(
                this.languageService.getCurrentLang().value + `/auth/code-verification`,
              );
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
      this.signUpForm.setErrors({ apiCommonError: true });
    }
  }
}
