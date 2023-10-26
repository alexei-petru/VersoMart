import { FormControl } from '@angular/forms';

export const getFormErrorMessageKey = (formControl: FormControl): string => {
  // common
  if (formControl.hasError('required')) {
    return 'formErrors.required';
  }
  if (formControl.hasError('email')) {
    return 'formErrors.email';
  }
  if (formControl.hasError('minlength')) {
    return 'formErrors.minLength';
  }
  if (formControl.hasError('maxlength')) {
    return 'formErrors.maxLength';
  }

  if (formControl.hasError('noDigit')) {
    return 'formErrors.noDigit';
  }
  if (formControl.hasError('incorrectLength')) {
    return 'formErrors.incorrectLength';
  }

  // api
  if (formControl.hasError('invalidCredentials')) {
    return 'formErrors.invalidCredentials';
  }

  return 'formErrors.invalid';
};
