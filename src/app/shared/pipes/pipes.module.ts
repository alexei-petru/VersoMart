import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomTranslate } from './custom-translate.pipe';

@NgModule({
  declarations: [CustomTranslate],
  imports: [CommonModule],
  exports: [CustomTranslate],
})
export class PipesModule {}
