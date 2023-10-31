import { Injectable, ErrorHandler } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppGlobalErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    if (environment.production === false) {
      // console.error(error);
    } else {
      console.error(error);
      // Send error to external logging tool
    }
  }
}
