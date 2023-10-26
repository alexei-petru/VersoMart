import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryCustomService } from './in-mem-custom.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InMemoryWebApiModule.forRoot(InMemoryCustomService, { passThruUnknownUrl: true, delay: 500 }),
  ],
  exports: [InMemoryWebApiModule],
})
export class InMemoryWebApiCustomModule {}
