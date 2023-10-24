import { Component, Input, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';

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
  @Optional() @Input() getErrorMessageKey: (formControl: FormControl) => string = () => '';
}
