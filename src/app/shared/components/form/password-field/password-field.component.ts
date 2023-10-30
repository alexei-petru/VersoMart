import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getLocalFormErrorsTranslationKey } from '@app/core/utils/form/form';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent {
  @Input() passwordControl!: FormControl;
  getLocalErrorMessageKey = getLocalFormErrorsTranslationKey;

  isPswHiden = true;
}
