import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-btn-action',
  templateUrl: './btn-action.component.html',
  styleUrls: ['./btn-action.component.scss'],
})
export class BtnActionComponent {
  @Input() isFormValid = false;
  @Input() buttonTranslateKey = '';
  @Input() isFormLoading = false;
  @Input() spinnerDiameter = 30;
}
