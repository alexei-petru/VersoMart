import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { SsrLanguageService } from './ssr/ssr-language.service';

@NgModule({
  imports: [AppModule, ServerModule],
  bootstrap: [AppComponent],
})
export class AppServerModule {
  constructor(private ssrLanguageService: SsrLanguageService) {
    this.ssrLanguageService.initiate();
  }
}
