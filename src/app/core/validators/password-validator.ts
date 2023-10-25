import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const hasDigit = /\d/.test(value);
  const incorrectLenght = /^.{5,8}$/.test(value);

  const errors: ValidationErrors = {};

  if (!hasDigit) {
    errors['noDigit'] = 'The value should have at least one digit';
  }

  if (incorrectLenght) {
    errors['incorrectLength'] = 'The length of the value should be more than 8 characters';
  }

  return Object.keys(errors).length ? errors : null;
}
