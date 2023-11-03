import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppGlobalErrorHandler implements ErrorHandler {
  handleError(): void {
    if (environment.production === false) {
      // console.error(error);
      // console.log('\x1b[35m%s\x1b[0m', `global-error-handler H12:04 L11: 'error'`, err);
    } else {
      // Send error to external logging tool
      // console.log('\x1b[35m%s\x1b[0m', `global-error-handler H12:04 L11: 'error'`, err);
    }
  }
}
