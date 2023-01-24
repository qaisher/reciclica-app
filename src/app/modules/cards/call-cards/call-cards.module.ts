import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallCardsComponent } from './call-cards.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [CallCardsComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CallCardsComponent
  ]
})
export class CallCardsModule { }
