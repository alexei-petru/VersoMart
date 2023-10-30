import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { languageRedirectGuard } from './core/guards/home-redirect/language-redirect.guard';
import { LANGUAGES_ALL_VAL_ARR } from './core/models/constants';

const routesArr: Routes = LANGUAGES_ALL_VAL_ARR.flatMap((lang) => {
  return [
    {
      path: lang,
      component: HomeComponent,
      canActivate: [languageRedirectGuard],
      data: { routeKey: 'homePage' },
    },
    {
      path: lang + '/auth',
      loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
      canActivate: [languageRedirectGuard],
      data: { isAuthPage: true },
    },
  ];
});

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [languageRedirectGuard], pathMatch: 'full' },
  ...routesArr,
  {
    path: '404',
    component: NotFoundComponent,
    data: { routeKey: 'notFoundPage' },
  },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [provideClientHydration(), provideRouter(routes, withDebugTracing())],
})
export class AppRoutingModule {}
