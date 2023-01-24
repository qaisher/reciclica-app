import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegisterPageRoutingModule } from './register-routing.module';
import { RegisterPage } from './register.page';
import { ReactiveFormsModule } from '@angular/forms'
import { ErrorMessageModule } from 'src/app/modules/error-message/error-message.module';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterPageRoutingModule,
    ReactiveFormsModule,
    ErrorMessageModule
  ],
  declarations: [RegisterPage],
  providers: [
    Geolocation
  ]
})
export class RegisterPageModule {}
