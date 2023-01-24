import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap } from "rxjs";
import { UserRegister } from "src/app/model/user/UserRegister";
import { AuthService } from "src/app/services/auth/auth.service";
import { register, registerFail, registerSuccess } from "./register.actions";

@Injectable()
export class RegisterEffects {

    constructor(private actions$: Actions, private authService: AuthService) {

    }


    register$ = createEffect(() => this.actions$.pipe(
        ofType(register),
        switchMap((payload: {userRegister: UserRegister}) => 
            this.authService.register(payload.userRegister).pipe(
                map(() => registerSuccess()),
                catchError(error => of(registerFail({error})))
            )
        )
    ))
}