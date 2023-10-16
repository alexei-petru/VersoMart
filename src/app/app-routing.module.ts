import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { CustomTranslateLoader } from './core/loaders/translate-custom-loader';
import { ApiService } from './services/api.service';
import { LANGUAGES_ALL_VAL_ARR } from './shared/models/constants';

const routesArr = LANGUAGES_ALL_VAL_ARR.flatMap((lang) => {
  return [
    {
      path: lang,
      component: HomeComponent,
      data: { routeKey: 'home' },
    },
    {
      path: lang + '/auth',
      loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
      data: { isAuthPage: true, discriminantPathKey: 'HOMEPATH' },
    },
  ];
});

const routes: Routes = [
  { path: '', redirectTo: 'en', pathMatch: 'full' },
  ...routesArr,
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
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule, TranslateModule],
  providers: [
    TranslateService,
    provideClientHydration(),
    HttpClient,
    ApiService,
    MatSnackBar,
    // provideRouter(routes, withDebugTracing()),
  ],
})
export class AppRoutingModule {}
