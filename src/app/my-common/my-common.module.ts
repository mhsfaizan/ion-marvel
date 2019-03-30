import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from '../filter.pipe';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [FilterPipe,MyModalComponent],
  imports: [
    IonicModule,
    CommonModule,
  ],
  exports:[FilterPipe,MyModalComponent],
  entryComponents:[MyModalComponent]
})
export class MyCommonModule { }
