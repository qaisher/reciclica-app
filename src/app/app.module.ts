import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'
import { CallCardsModule } from './modules/cards/call-cards/call-cards.module';
import { AppStoreModule } from 'src/store/AppStoreModule';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LoadingModule } from './modules/loading/loading.module';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';




@NgModule({
  declarations: [
    AppComponent, 
    // PickupCallCardComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    CallCardsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ...AppStoreModule,
    StoreDevtoolsModule.instrument({maxAge: 25}),
    LoadingModule,
    
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
