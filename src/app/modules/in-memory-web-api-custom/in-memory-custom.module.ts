import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryCustomService } from './in-mem-custom.service';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InMemoryWebApiModule.forRoot(InMemoryCustomService, { passThruUnknownUrl: true, delay: 700 }),
  ],
  exports: [InMemoryWebApiModule],
  providers: [{ provide: SsrCookieService, useClass: SsrCookieCustomService }],
})
export class InMemoryWebApiCustomModule {}
