import { Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export const passwordValidators = [
  Validators.required,
  Validators.minLength(8),
  Validators.maxLength(50),
  passwordValidator,
];

export const emailValidators = [
  Validators.required,
  Validators.minLength(4),
  Validators.maxLength(50),
  Validators.email,
];

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const hasDigit = /\d/.test(value);

  const errors: ValidationErrors = {};

  if (!hasDigit) {
    errors['noDigit'] = 'The value should have at least one digit';
  }

  return Object.keys(errors).length ? errors : null;
}
