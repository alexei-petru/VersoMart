import { Component, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-username-field',
  templateUrl: './username-field.component.html',
  styleUrls: ['./username-field.component.scss'],
})
export class UsernameFieldComponent {
  @Input() translationKey = 'signInPage.emailInput.label';
  @Input() fieldType = 'text';
  @Input() usernameFormControl!: FormControl;
  @Input() placeholderKey = '';
}
