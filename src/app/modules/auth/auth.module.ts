import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CodeVerificationComponent } from './code-verification/code-verification.component';

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
  {
    path: 'code-verification',
    component: CodeVerificationComponent,
    data: { routeKey: 'codeVerificationPage' },
  },
];

@NgModule({
  declarations: [SignInComponent, SignUpComponent, AuthLayoutComponent, CodeVerificationComponent],
  imports: [
    MatCheckboxModule,
    CommonModule,
    TranslateModule,
    RouterModule.forChild(routes),
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
