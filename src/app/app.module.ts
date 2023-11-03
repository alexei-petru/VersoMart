import { ErrorHandler, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppGlobalErrorHandler } from './core/global-error-handler';
import { SsrCookieCustomService } from './core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { CustomTranslateLoader } from './core/loaders/translate-custom-loader';
import { ApiService } from './services/api.service';
import { SharedModule } from './shared/shared.module';
// eslint-disable-next-line no-restricted-imports
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { DevModule } from '@app/modules/dev/dev.module';
import { InMemoryWebApiCustomModule } from '@app/modules/in-memory-web-api-custom/in-memory-custom.module';
import { environment } from 'src/environments/environment';
// import { RouteReuseStrategy } from '@angular/router';
// import { CustomReuseStrategy } from '@app/core/router/custom-reuse-strategy';

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
        deps: [HttpClient, ApiService, PLATFORM_ID],
      },
    }),
    environment.isInMemoryWebApi ? InMemoryWebApiCustomModule : [],
    !environment.production ? DevModule : [],
  ],

  providers: [
    { provide: SsrCookieService, useClass: SsrCookieCustomService },
    {
      provide: ErrorHandler,
      useClass: AppGlobalErrorHandler,
    },
    // { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    provideClientHydration(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
