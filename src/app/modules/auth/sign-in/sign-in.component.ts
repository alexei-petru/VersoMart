import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  pageTitle = 'signInPage';
  isPswHiden = true;
  signInForm: FormGroup;
  passwordControl = new FormControl();

  constructor(
    private translateService: TranslateService,
    private title: Title,
    private metaService: Meta,
    private fb: FormBuilder,
  ) {
    this.signInForm = this.fb.group({
      email: new FormControl(),
      password: this.passwordControl,
    });
  }

  private setMetaData() {
    const title = this.translateService.instant(this.pageTitle + '.metaTitle');
    const description = this.translateService.instant(this.pageTitle + '.metaDescription');

    this.title.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    // this.appTranslateService.updateMetaData(title, description);
  }
}
