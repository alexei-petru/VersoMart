import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { NotFoundComponent } from './core/components/not-found/not-found.component';
import { LANGUAGES } from './shared/constants';

const langRoutes: Routes[] = LANGUAGES.map((lang) => {
  return [
    {
      path: lang,
      component: HomeComponent,
    },
    {
      path: lang + '/auth',
      loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    { path: '', redirectTo: lang, pathMatch: 'full' },
  ];
});

const routes: Routes = [
  ...langRoutes.flat(),
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
