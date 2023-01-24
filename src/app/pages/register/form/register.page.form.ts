import { FormBuilder, FormGroup, ValidatorFn, Validators } from "@angular/forms";

export class RegisterPageForm {

    private formBuilder: FormBuilder;
    private registerForm: FormGroup;

    constructor(fb: FormBuilder) {
        this.formBuilder = fb;
        this.registerForm = this.createForm();
    }

    private createForm() : FormGroup {
        let regForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: [''],
            phone: ['', [Validators.required]],
            address: this.formBuilder.group({
                street: ['', [Validators.required]],
                landmark: [''],
                city: ['', [Validators.required]],
                pincode: ['', [Validators.required]],
                state: ['', [Validators.required]],
                number: ['', [Validators.required]]
            })
        });

        // regForm.get('password')?.setValidators(matchPasswordAndConfirmPassword(regForm));

        return regForm;
    }

    getForm() : any {
        return this.registerForm;
    }
}

// function matchPasswordAndConfirmPassword(form: FormGroup) : ValidatorFn {
//     const password = form.get('password');
//     const confirmPassword = form.get('confirmPassword');

//     const validator = () => {
//         return password?.value == confirmPassword?.value ? null : {isntMatching: true}
//     }

//     return validator;
// }