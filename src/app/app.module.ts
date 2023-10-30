import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SsrCookieCustomService } from './core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { CustomTranslateLoader } from './core/loaders/translate-custom-loader';
import { ApiService } from './services/api.service';
import { SharedModule } from './shared/shared.module';
import { environment } from 'environment';
// eslint-disable-next-line no-restricted-imports
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { AppGlobalErrorHandler } from './core/global-error-handler';
import { InMemoryWebApiCustomModule } from './modules/in-memory-web-api-custom/in-memory-custom.module';
import { DevModule } from './modules/dev/dev.module';

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
    environment.useInMemoryWebApi ? InMemoryWebApiCustomModule : [],
    !environment.production ? DevModule : [],
  ],

  providers: [
    { provide: SsrCookieService, useClass: SsrCookieCustomService },
    {
      provide: ErrorHandler,
      useClass: AppGlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
