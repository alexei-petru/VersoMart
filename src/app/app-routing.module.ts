import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {
  LocalizeParser,
  LocalizeRouterModule,
  LocalizeRouterSettings,
  ManualParserLoader,
} from '@gilsdav/ngx-translate-router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { CustomTranslateLoader } from './core/loaders/translate-custom-loader';
import { MyLocalizeRouterSettings } from './core/settings/translate-router-settings';
import { ApiService } from './services/api.service';
import { LANGUAGES_ALL_VAL_ARR } from './shared/models/constants';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: { routeKey: 'home' },
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  { path: '404', component: NotFoundComponent, data: { routeKey: 'notFound' } },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient, ApiService, MatSnackBar],
      },
    }),
    RouterModule.forRoot(routes, {
      initialNavigation: 'disabled',
    }),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (
          translate: TranslateService,
          location: Location,
          settings: MyLocalizeRouterSettings,
        ) => new ManualParserLoader(translate, location, settings, [...LANGUAGES_ALL_VAL_ARR]),
        deps: [TranslateService, Location, MyLocalizeRouterSettings],
      },
      initialNavigation: true,
    }),
  ],
  exports: [RouterModule, TranslateModule, LocalizeRouterModule],
  providers: [
    TranslateService,
    provideClientHydration(),
    HttpClient,
    ApiService,
    MatSnackBar,
    Location,
    LocalizeRouterSettings,
  ],
})
export class AppRoutingModule {}
