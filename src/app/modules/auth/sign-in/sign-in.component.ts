import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  pageTitle = 'signInPage';
  signInForm: FormGroup;
  passwordControl = new FormControl('', Validators.required);
  usernameFormControl = new FormControl('', Validators.required);

  constructor(
    private translateService: TranslateService,
    private title: Title,
    private metaService: Meta,
    private fb: FormBuilder,
  ) {
    this.signInForm = this.fb.group({
      username: this.usernameFormControl,
      password: this.passwordControl,
    });
  }

  submitForm() {
    const signInMetaTitle = this.translateService.instant('signInPage.metaTitleDefault');
    console.log(
      '\x1b[35m%s\x1b[0m',
      `sign-in.component H08:45 L32: 'signinmetatitle'`,
      signInMetaTitle,
    );
    if (this.signInForm.valid) {
      console.log(
        '\x1b[35m%s\x1b[0m',
        `sign-in.component H17:07 L30: 'submitForm'`,
        this.signInForm.value,
      );
    } else {
      console.log(
        '\x1b[35m%s\x1b[0m',
        `sign-in.component H17:24 L38: 'submitForm invalid'`,
        this.signInForm.value,
      );
    }
  }

  private setMetaData() {
    const title = this.translateService.instant(this.pageTitle + '.metaTitle');
    const description = this.translateService.instant(this.pageTitle + '.metaDescription');

    this.title.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    // this.appTranslateService.updateMetaData(title, description);
  }
}
