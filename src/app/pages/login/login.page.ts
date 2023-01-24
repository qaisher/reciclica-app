import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AppState } from 'src/store/AppState';
import { hide, show } from 'src/store/loading/loading.actions';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { LoginState } from 'src/store/login/LoginState';
import { LoginPageForm } from './login.page.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  loginForm: any;
  loginStateSubscription: Subscription;

  constructor(private router: Router, 
    private formBuilder: FormBuilder, 
    private store: Store<AppState>, 
    private toastController: ToastController, 
    private authService: AuthService,
    private navController: NavController
    ) { }

  ngOnInit() {
    this.loginForm = new LoginPageForm(this.formBuilder).createForm();

    this.loginStateSubscription = this.store.select('login').subscribe(loginState => {
      this.onIsRecoveredPassword(loginState);
      // this.onIsRecoveringPassword(loginState);
     
      // this.onIsLoggingIn(loginState);
      this.onIsLoggedIn(loginState);

      this.onError(loginState);
      
      this.toggleLoading(loginState);

    })
  }

  ngOnDestroy(): void {
    if(this.loginStateSubscription) {
      this.loginStateSubscription.unsubscribe();
    }
  }

  // private onIsLoggingIn(loginState: LoginState){
  //   if(loginState.isLoggingIn){
  //     const email = this.loginForm.get('email').value;
  //     const password = this.loginForm.get('password').value;
  //     this.authService.login(email, password).subscribe(user => {
  //       this.store.dispatch(loginSuccess({user}));
  //     }, error => {
  //       this.store.dispatch(loginFail({error}));
  //     })
  //   }
  // }

  private onIsLoggedIn(loginState: LoginState) {
    if(loginState.isLoggedIn){
      // this.router.navigate(['home']);
      this.navController.navigateRoot(['home']);
    }
  }

  private async onError(loginState: LoginState) {
    if (loginState.error) {
      this.toggleLoading(loginState);
      const toaster = await this.toastController.create({
        position: "bottom",
        message: loginState.error.message,
        color: "danger",
        duration: 3000,
        header: 'Error logging in'
      });
      // console.log(toaster.message);
      toaster.present();
    }
  }


  private async onIsRecoveredPassword(loginState: LoginState) {

    if (loginState.isRecoveredPassword) {
      this.toggleLoading(loginState);
      const toaster = await this.toastController.create({
        position: "bottom",
        message: "Recovery email sent",
        color: "primary",
        duration: 5000
      });
      toaster.present();
    }
  }

  // private onIsRecoveringPassword(loginState: LoginState) {

  //   if (loginState.isRecoveringPassword) {
  //     this.toggleLoading(loginState);

  //     this.authService.recoverEmailPassword(this.loginForm.get('email').value).subscribe(() => {
  //       this.store.dispatch(recoverPasswordSuccess());
  //     }, error => {
  //       this.store.dispatch(recoverPasswordFail({ error }))
  //     });

  //   }
  // }

  private toggleLoading(loginState: LoginState){
    if(loginState.isRecoveringPassword || loginState.isLoggingIn){
      this.store.dispatch(show());
    }
    else {
      this.store.dispatch(hide());
    }
  }

  forgotEmailPassword() {
    this.store.dispatch(recoverPassword({email: this.loginForm.get('email').value}));
    // this.store.dispatch(show());

    // setTimeout(() => {
    //   this.store.dispatch(hide());
    // }, 3000
    // );
  }

  login() {
    // this.router.navigate(['home']);
    this.store.dispatch(login({email: this.loginForm.get('email').value, password: this.loginForm.get('password').value}))
  }

  register() {
    this.router.navigate(['register']);
  }

}
