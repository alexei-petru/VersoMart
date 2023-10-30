import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { getLocalFormErrorsTranslationKey } from '@app/core/utils/form/form';

@Component({
  selector: 'app-email-field',
  templateUrl: './email-field.component.html',
  styleUrls: ['./email-field.component.scss'],
})
export class EmailFieldComponent {
  @Input() translationKey = 'signInPage.emailInput.label';
  @Input() fieldType = 'email';
  @Input() emailFormControl!: FormControl;
  @Input() placeholderKey = '';
  @Input() errorMsg = '';
  getErrorMessageKey = getLocalFormErrorsTranslationKey;
}
