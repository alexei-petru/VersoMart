import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';

export interface DropdownOption {
  value: string;
  title: string;
}
export type DropdownOptions = DropdownOption[];

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent {
  // defaultOption and allOptionsArr need to have the same obj reference in order to work properly
  @Input() defaultOption$: Observable<DropdownOption> | null = null;
  @Input() allOptionsArr$: Observable<DropdownOptions> | null = null;
  @Input() imgUrl: string | null = null;
  @Input() matIconName: string | null = null;
  @Output() selectedValue = new EventEmitter<DropdownOption>();

  selectOption(option: MatSelectChange): void {
    this.selectedValue.emit(option.value);
  }
}
