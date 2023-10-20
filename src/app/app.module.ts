import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CustomTranslateLoader } from './core/loaders/translate-custom-loader';
import { ApiService } from './services/api.service';
import { SharedModule } from './shared/shared.module';
import { SsrCookieCustomService } from './core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
// eslint-disable-next-line no-restricted-imports
import { SsrCookieService } from 'ngx-cookie-service-ssr';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient, ApiService],
      },
    }),
  ],

  providers: [{ provide: SsrCookieService, useClass: SsrCookieCustomService }],
  bootstrap: [AppComponent],
})
export class AppModule {}
