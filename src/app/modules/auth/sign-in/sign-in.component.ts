import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { normalizeErrorResponse } from '@app/core/utils/error-normalize';
import { getFormErrorMessageKey } from '@app/core/utils/form';
import { emailValidators, passwordValidators } from '@app/core/validators/validators-list';
import { AuthService } from '@app/services/auth.service';
import { LanguageService } from '@app/services/language.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnDestroy {
  pageTitle = 'signInPage';
  languageApp$ = this.languageService.languageApp$;
  signInForm: FormGroup;
  emailFormControl = new FormControl('', emailValidators);
  passwordControl = new FormControl('', passwordValidators);
  authState$ = this.authService.authState$;
  getFormErrorMessageKey = getFormErrorMessageKey;
  signInFormSub: Subscription;
  loginSub = new Subscription();

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.signInForm = this.fb.group({
      email: this.emailFormControl,
      password: this.passwordControl,
    });

    this.signInFormSub = this.signInForm.valueChanges.subscribe(() => {
      this.authService.resetApiErrorObj();
      this.removeApiError();
    });
  }

  private removeApiError() {
    Object.keys(this.signInForm.controls).forEach((controlName) => {
      const controlErrors = this.signInForm.controls[controlName].errors;
      if (controlErrors) {
        delete controlErrors['invalidCredentials'];
        const updatedErrors = this.isEmptyObj(controlErrors) ? null : controlErrors;
        this.signInForm.controls[controlName].setErrors(updatedErrors);
      }
    });
  }

  private isEmptyObj(obj: object) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  submitForm() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.loginSub = this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigateByUrl(this.languageService.getCurrentLang().value);
        },
        error: (errObj) => {
          this.setApiFormErrors(normalizeErrorResponse(errObj));
        },
      });
    }
  }

  private setApiFormErrors(errArr: string[]) {
    if (errArr[0] === 'Invalid credential') {
      Object.keys(this.signInForm.controls).forEach((controlName) => {
        this.signInForm.controls[controlName].setErrors({ invalidCredentials: true });
      });
    }
  }

  ngOnDestroy() {
    this.signInFormSub?.unsubscribe();
    this.loginSub?.unsubscribe();
  }
}
