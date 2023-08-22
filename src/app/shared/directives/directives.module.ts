import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTranslateDirective } from './custom-translate.directive';

@NgModule({
  declarations: [CustomTranslateDirective],
  imports: [CommonModule],
  exports: [CustomTranslateDirective],
})
export class DirectivesModule {}
