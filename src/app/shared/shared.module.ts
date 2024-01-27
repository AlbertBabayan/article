import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModalComponent } from './components/modal/shared-modal.component';
import { LimitToPipe } from './pipes/limit-to.pipe';



@NgModule({
  declarations: [
    SharedModalComponent,
    LimitToPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SharedModalComponent,
    LimitToPipe
  ],
})
export class SharedModule { }
