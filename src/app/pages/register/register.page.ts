import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { constants } from 'buffer';
import { Subscription } from 'rxjs';
import { LocationService } from 'src/app/services/location/location.service';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { login } from 'src/store/login/login.actions';
import { register } from 'src/store/register/register.actions';
import { RegisterState } from 'src/store/register/RegisterState';
import { RegisterPageForm } from './form/register.page.form';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  registerForm: RegisterPageForm;

  registerStateSubscription: Subscription;

  constructor(
    private router : Router, 
    private myFormBuilder: FormBuilder, 
    private store: Store<AppState>,
    private toastController: ToastController,
    private geolocation: Geolocation,
    private locationService: LocationService
    ) { }

  ngOnInit() {
    this.createForm();

    this.watchRegisterState();

    this.fillAddressWithUserCurrentPosition();
  }

  ngOnDestroy(): void {
    this.registerStateSubscription.unsubscribe();
  }

  register() {
    this.registerForm.getForm().markAllAsTouched();

    if(this.registerForm.getForm().valid){
      // this.router.navigate(['home']);
      this.store.dispatch(register({userRegister: this.registerForm.getForm().value}));
    }
    
  }

  private fillAddressWithUserCurrentPosition() {
    this.geolocation.getCurrentPosition().then(position => {
      console.log(position);
      this.locationService.geocode(position.coords).subscribe((res) => {
        console.log(res);
      });
      
    })
  }

  private createForm(){
    this.registerForm = new RegisterPageForm(this.myFormBuilder);
    
  }
  
  private watchRegisterState() {
    this.registerStateSubscription = this.store.select('register').subscribe(state => {
      this.toggleLoading(state);

      this.onRegistered(state);
      this.onError(state);
      
    })
  }

  private onRegistered(state : RegisterState){
    if(state.isRegistered){
      // this.router.navigate(['home']);
      this.store.dispatch(login({
        email: this.registerForm.getForm().value.email,
        password: this.registerForm.getForm().value.password
      }))
    }
  }

  private onError(state : RegisterState){
    if(state.error){
      this.toastController.create({
        message: state.error.message,
        duration: 5000,
        header: 'Registration not done'
      }).then(toast => toast.present());
    }
  }

  private toggleLoading(state: RegisterState) {
    if(state.isRegistering){
      this.store.dispatch(show());
    }
    else{
      this.store.dispatch(hide());
    }
  }

  
}
