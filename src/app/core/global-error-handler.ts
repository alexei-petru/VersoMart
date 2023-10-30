import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from 'environment';

@Injectable()
export class AppGlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (environment.production === false) {
      // console.error(error);
    } else {
      // Send error to external logging tool
    }
  }
}
