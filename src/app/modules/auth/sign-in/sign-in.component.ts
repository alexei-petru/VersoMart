import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { LanguageService } from '@app/services/language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  pageTitle = 'signInPage';
  languageApp$ = this.languageService.languageApp$;
  signInForm: FormGroup;
  passwordControl = new FormControl('', Validators.required);
  usernameFormControl = new FormControl('', Validators.required);

  constructor(
    private translateService: TranslateService,
    private title: Title,
    private metaService: Meta,
    private fb: FormBuilder,
    private languageService: LanguageService,
  ) {
    this.signInForm = this.fb.group({
      username: this.usernameFormControl,
      password: this.passwordControl,
    });
  }

  submitForm() {
    console.log(
      '\x1b[35m%s\x1b[0m',
      `sign-in.component H18:58 L33: 'formValues'`,
      this.signInForm.value,
    );
  }

  private setMetaData() {
    const title = this.translateService.instant(this.pageTitle + '.metaTitle');
    const description = this.translateService.instant(this.pageTitle + '.metaDescription');

    this.title.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    // this.appTranslateService.updateMetaData(title, description);
  }
}
