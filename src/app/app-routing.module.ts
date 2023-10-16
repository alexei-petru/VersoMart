import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { homeRedirectGuard } from './core/guards/home-redirect/home-redirect.guard';
import { LANGUAGES_ALL_VAL_ARR } from './shared/models/constants';

const routesArr: Routes = LANGUAGES_ALL_VAL_ARR.flatMap((lang) => {
  return [
    {
      path: lang,
      component: HomeComponent,
      data: { routeKey: 'home' },
    },
    {
      path: lang + '/auth',
      loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
      data: { isAuthPage: true },
    },
  ];
});

const routes: Routes = [
  { path: '', canActivate: [homeRedirectGuard], component: HomeComponent, pathMatch: 'full' },
  ...routesArr,
  { path: '404', component: NotFoundComponent, data: { routeKey: 'notFound' } },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [provideClientHydration(), provideRouter(routes, withDebugTracing())],
})
export class AppRoutingModule {}
