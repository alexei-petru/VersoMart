import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '@app/services/language.service';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  pageTitle = 'signUpPage';
  languageApp$ = this.languageService.languageApp$;
  signUpForm: FormGroup;
  passwordControl = new FormControl('', Validators.required);
  emailFormControl = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
  ) {
    this.signUpForm = this.fb.group({
      username: this.emailFormControl,
      password: this.passwordControl,
      termsAndPrivacy: new FormControl(true, Validators.requiredTrue),
      newsletter: new FormControl(false),
    });
  }

  submitForm() {
    console.log(
      '\x1b[35m%s\x1b[0m',
      `sign-up.component H15:07 L27: 'fromDetails'`,
      this.signUpForm,
    );
  }
}
