import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ErrorMessageComponent
  ]
})
export class ErrorMessageModule { }
