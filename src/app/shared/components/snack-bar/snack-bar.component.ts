import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { SnackbarData } from '../../../core/models/types';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent {
  constructor(
    private _snackBar: MatSnackBar,
    private snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public snackbarData: SnackbarData,
  ) {}

  openSnackBar(
    message: string,
    button: string,
    delay?: number,
    horizontalPosition: MatSnackBarHorizontalPosition = 'start',
    verticalPosition: MatSnackBarVerticalPosition = 'bottom',
  ) {
    this._snackBar.open(message, button, {
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }

  closeSnackBar() {
    this.snackBarRef.dismiss();
  }
}
