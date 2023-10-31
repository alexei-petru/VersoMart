import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryCustomService } from './in-mem-custom.service';
import { SsrCookieCustomService } from '@app/core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
// eslint-disable-next-line no-restricted-imports
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InMemoryWebApiModule.forRoot(InMemoryCustomService, { passThruUnknownUrl: true }),
  ],
  exports: [InMemoryWebApiModule],
  providers: [{ provide: SsrCookieService, useClass: SsrCookieCustomService }],
})
export class InMemoryWebApiCustomModule {}
