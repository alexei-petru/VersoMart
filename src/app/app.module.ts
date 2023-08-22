import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { HeaderComponent } from './core/components/header/header.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { MaterialModule } from './shared/material.module';

// export class MyMissingTranslationHandler implements MissingTranslationHandler {
//   handle(params: MissingTranslationHandlerParams) {
//     return 'some value';
//   }
// }

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, NotFoundComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http),
        deps: [HttpClient],
      },
      // missingTranslationHandler: { provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
