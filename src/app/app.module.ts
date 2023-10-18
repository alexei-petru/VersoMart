import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { CustomTranslateLoader } from './core/loaders/translate-custom-loader';
import { ApiService } from './services/api.service';
import { SsrCookieCustomService } from './core/libraries/custom-ssr-cookie/ssr-cookie-custom.service';
import { REQUEST } from '@nguniversal/express-engine/tokens';

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
  providers: [
    SsrCookieService,
    {
      provide: REQUEST,
      useFactory: (req: unknown) => req,
    },
    { provide: SsrCookieService, useClass: SsrCookieCustomService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
