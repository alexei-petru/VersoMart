import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { ThemeService } from '../services/styling/theme.service';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';

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
    SnackBarComponent,
    ClickOutsideDirective,
    MatSelectModule,
    DropdownComponent,
  ],
  declarations: [SnackBarComponent, ClickOutsideDirective, DropdownComponent],
  providers: [ThemeService],
})
export class SharedModule {}
