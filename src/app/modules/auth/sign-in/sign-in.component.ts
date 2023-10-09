import { Component } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  pageTitle = 'signIn';
  hide = false;

  constructor(
    private appTranslateService: LanguageService,
    private translateService: TranslateService,
    private title: Title,
    private metaService: Meta,
  ) {
    // this.setMetaData();
  }

  private setMetaData() {
    const title = this.translateService.instant(this.pageTitle + '.META_TITLE');
    const description = this.translateService.instant(this.pageTitle + 'META_DESCRIPTION');

    this.title.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: description });
    // this.appTranslateService.updateMetaData(title, description);
  }
}
