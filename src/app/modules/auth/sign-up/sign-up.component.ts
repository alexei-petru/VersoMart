import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignUpFormValues } from '@app/core/models/types';
import { getFormErrorMessageKey } from '@app/core/utils/form';
import { emailValidators, passwordValidators } from '@app/core/validators/validators-list';
import { AuthService } from '@app/services/auth.service';
import { LanguageService } from '@app/services/language.service';

export type SignUpFormMap<T> = {
  [P in keyof T]: AbstractControl<T[P]>;
};

export type SignUpForm = SignUpFormMap<SignUpFormValues>;

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  pageTitle = 'signUpPage';
  languageApp$ = this.languageService.languageApp$;
  signUpForm: FormGroup;
  getFormErrorMessageKey = getFormErrorMessageKey;
  emailFormControl = new FormControl('', emailValidators);
  passwordControl = new FormControl('', passwordValidators);

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private authService: AuthService,
  ) {
    this.signUpForm = this.fb.group<SignUpForm>({
      email: this.emailFormControl,
      password: this.passwordControl,
      termsAndPrivacy: new FormControl(true, Validators.requiredTrue),
      newsletter: new FormControl(false),
    });
  }

  submitForm() {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value);
    }
  }
}
