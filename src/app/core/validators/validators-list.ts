import { Validators } from '@angular/forms';
import { passwordValidator } from './password-validator';

export const passwordValidators = [
  // Validators.required,
  // Validators.minLength(8),
  // Validators.maxLength(50),
  // passwordValidator,
];

export const emailValidators = [
  Validators.required,
  Validators.minLength(4),
  Validators.maxLength(50),
];
