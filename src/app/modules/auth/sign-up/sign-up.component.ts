import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  hide = false;

  constructor(private metaTitle: Title, private translate: TranslateService) {
    // const title = translate.instant('signUp.META_TITLE');
    // console.log('sign-up.component H16:09 L14:', title);
    // metaTitle.setTitle(translate.instant('signUp.META_TITLE'));
  }
}
