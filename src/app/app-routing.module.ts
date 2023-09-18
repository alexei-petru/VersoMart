import { Location } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { LANGUAGES } from './shared/constants';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomTranslateLoader } from './core/loaders/custom-translate-loader';
import { ApiService } from './services/api.service';
import { provideClientHydration } from '@angular/platform-browser';
import { MyLocalizeRouterSettings } from './core/settings/translate-router-settings';

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
    RouterModule.forRoot(routes, {
      initialNavigation: 'disabled',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader,
        deps: [HttpClient, ApiService, MatSnackBar],
      },
    }),
    LocalizeRouterModule.forRoot(routes, {
      initialNavigation: true,
      parser: {
        provide: LocalizeParser,
        useFactory: (
          translate: TranslateService,
          location: Location,
          settings: MyLocalizeRouterSettings,
        ) => new ManualParserLoader(translate, location, settings, [...LANGUAGES]),
        deps: [TranslateService, Location, MyLocalizeRouterSettings],
      },
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
