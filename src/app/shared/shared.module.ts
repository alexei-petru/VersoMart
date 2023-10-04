import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { ThemeService } from '../services/styling/theme.service';
import { MatSelectModule } from '@angular/material/select';
import { ThemeSelectComponent } from './components/theme-select/theme-select.component';
import { LanguageSelectComponent } from './components/language-select/language-select.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
  imports: [
    CommonModule,
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
  ],
  exports: [
    CommonModule,
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
    ThemeSelectComponent,
    SnackBarComponent,
    ClickOutsideDirective,
    MatSelectModule,
    DropdownComponent,
  ],
  declarations: [
    SnackBarComponent,
    ThemeSelectComponent,
    ClickOutsideDirective,
    LanguageSelectComponent,
    DropdownComponent,
  ],
  providers: [ThemeService],
})
export class SharedModule {}
