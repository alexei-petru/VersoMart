import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { DirectivesModule } from 'src/app/shared/directives/directives.module';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslateModule.forChild(),
    PipesModule,
    DirectivesModule,
    MaterialModule,
  ],
})
export class AuthModule {}
