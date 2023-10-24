import { Component, Input, Optional } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss'],
})
export class PasswordFieldComponent {
  @Input() passwordControl!: FormControl;
  @Optional() @Input() getErrorMessageKey: (formControl: FormControl) => string = () => '';

  isPswHiden = true;
}
