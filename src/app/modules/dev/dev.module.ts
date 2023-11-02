import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpVerifyService } from './services/http-verify.service';

export function initializeApp(myService: HttpVerifyService) {
  return (): Promise<unknown> => {
    return myService.initService();
  };
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  // providers: [
  //   HttpVerifyService,
  //   {
  //     provide: APP_INITIALIZER,
  //     useFactory: initializeApp,
  //     deps: [HttpVerifyService],
  //     multi: true,
  //   },
  // ],
})
export class DevModule {}
