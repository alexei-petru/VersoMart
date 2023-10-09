import { Component, Input } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-auth-buttons',
  templateUrl: './auth-buttons.component.html',
  styleUrls: ['./auth-buttons.component.scss'],
})
export class AuthButtonsComponent {
  @Input() matMenu: MatMenu | null = null;
  lang$ = this.appTranslateService.languageApp$;
  constructor(private appTranslateService: LanguageService) {}
}
