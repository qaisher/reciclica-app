import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class LoginPageForm {

    private fb : FormBuilder;

    constructor(formBuilder : FormBuilder) {
        this.fb = formBuilder;
    }

    createForm() : FormGroup {
        return this.fb.group({
            email : ['', [Validators.required, Validators.email]],
            password : ['', [Validators.required]]
        });
    }
}