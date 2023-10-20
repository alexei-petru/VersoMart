import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent,
    data: { routeKey: 'signInPage' },
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
    data: { routeKey: 'signUpPage' },
  },
];

@NgModule({
  declarations: [SignInComponent, SignUpComponent, AuthLayoutComponent],
  imports: [
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
