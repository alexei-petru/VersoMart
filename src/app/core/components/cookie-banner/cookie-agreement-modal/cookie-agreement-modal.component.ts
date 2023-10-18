import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cookie-agreement-modal',
  templateUrl: './cookie-agreement-modal.component.html',
  styleUrls: ['./cookie-agreement-modal.component.scss'],
})
export class CookieAgreementModalComponent {
  constructor(public dialog: MatDialog) {}
}
