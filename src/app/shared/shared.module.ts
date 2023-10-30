import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../services/styling/theme.service';
import { NavUserHubComponent } from '../shared/components/nav-user-hub/nav-user-hub.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { PasswordFieldComponent } from './components/form/password-field/password-field.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ClickOutsideDirective } from '../core/directives/click-outside.directive';
import { SocialAuthBtnsComponent } from './components/buttons/google-btn/social-auth-btns.component';
import { DividerComponent } from './components/form/divider/divider.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EmailFieldComponent } from './components/form/username-field/email-field.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BtnActionComponent } from './components/form/btn-action/btn-action.component';

@NgModule({
  declarations: [
    SnackBarComponent,
    ClickOutsideDirective,
    DropdownComponent,
    NavUserHubComponent,
    PasswordFieldComponent,
    SocialAuthBtnsComponent,
    DividerComponent,
    EmailFieldComponent,
    BtnActionComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    SnackBarComponent,
    ClickOutsideDirective,
    DropdownComponent,
    NavUserHubComponent,
    PasswordFieldComponent,
    SocialAuthBtnsComponent,
    DividerComponent,
    CommonModule,
    RouterLink,
    TranslateModule,
    FormsModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatSelectModule,
    EmailFieldComponent,
    MatDialogModule,
    MatProgressSpinnerModule,
    BtnActionComponent,
  ],
  providers: [ThemeService],
})
export class SharedModule {}
