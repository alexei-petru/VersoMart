import { HttpErrorResponse } from '@angular/common/http';

export function normalizeErrorResponse(errorObj: HttpErrorResponse): string[] {
  const errorMessages: string[] = [];

  // if the errorObj has a error object with a message array prop
  if (Array.isArray(errorObj.error.message)) {
    return errorObj.error.message;
  }

  // If the error object has an 'error' field that is an object with an 'errors' array
  if (errorObj.error && Array.isArray(errorObj.error.errors)) {
    errorMessages.push(...errorObj.error.errors);
  }

  // If the error object has an 'error' field that is an object with a 'message' field
  else if (errorObj.error && typeof errorObj.error.message === 'string') {
    errorMessages.push(errorObj.error.message);
  }

  // If the error object has an 'error' field that itself is a string
  else if (typeof errorObj.error === 'string') {
    errorMessages.push(errorObj.error);
  }

  // If the error object has a 'message' field
  else if (typeof errorObj.message === 'string') {
    errorMessages.push(errorObj.message);
  }

  // Fallback to statusText if no specific message is found
  else if (errorObj.statusText) {
    errorMessages.push(errorObj.statusText);
  }

  return errorMessages;
}
