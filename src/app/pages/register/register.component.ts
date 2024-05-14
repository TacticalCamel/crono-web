import {AuthService} from "../../services/auth.service";
import {NgIf} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, FormsModule, ValidationErrors, Validators} from "@angular/forms";
import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {FieldValidationMessageComponent} from "../shared/field-validation-message.component";
import {Router} from "@angular/router";

@Component({
    selector: 'route-register',
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        FieldValidationMessageComponent
    ],
    template: `
        <div class="flex flex-col justify-center items-center h-screen">
            <form class="w-96 grid gap-4" [formGroup]="registerForm" (ngSubmit)="tryRegister()">
                <label class="input input-primary flex items-center gap-2 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"/><path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"/></svg>
                    <input type="text" class="grow" placeholder="Email" formControlName="email"/>
                    <field-validation-message *ngIf="email.touched || email.dirty" [valid]="email.valid" class="absolute left-full ms-5 text-nowrap">
                        Email must be in a valid format
                    </field-validation-message>
                </label>

                <label class="input input-primary flex items-center gap-2 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"/></svg>
                    <input type="text" class="grow" placeholder="Username" formControlName="username"/>
                    <field-validation-message *ngIf="username.touched || username.dirty" [valid]="username.valid" class="absolute left-full ms-5 text-nowrap">
                        Username must be in a valid format
                    </field-validation-message>
                </label>
                <label class="input input-primary flex items-center gap-2 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd"
                                                                                                                                     d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                                                                                                     clip-rule="evenodd"/></svg>
                    <input type="password" class="grow" placeholder="Password" formControlName="password"/>
                    <field-validation-message *ngIf="password.touched || password.dirty" [valid]="password.valid" class="absolute left-full ms-5 text-nowrap">
                        {{ password.errors?.['message'] }}
                    </field-validation-message>
                </label>
                <label class="input input-primary flex items-center gap-2 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd"
                                                                                                                                     d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                                                                                                                     clip-rule="evenodd"/></svg>
                    <input type="password" class="grow" placeholder="Confirm password" formControlName="passwordConfirm"/>
                    <field-validation-message *ngIf="passwordConfirm.touched || passwordConfirm.dirty" [valid]="!registerForm.errors?.['passwordConfirm']" class="absolute left-full ms-5 text-nowrap">
                        Passwords must match
                    </field-validation-message>
                </label>
                <button type="submit" class="btn btn-primary mt-4" [disabled]="!registerForm.valid">Register</button>
            </form>
        </div>
    `
})

export class RegisterComponent {
    registerForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
        password: new FormControl('', [passwordValidator]),
        passwordConfirm: new FormControl('')
    }, {validators: [passwordsConfirmValidator]});

    constructor(private authService: AuthService, private router: Router) {

    }

    get username(): AbstractControl {
        return this.registerForm.get('username')!;
    }

    get email() {
        return this.registerForm.get('email')!;
    }

    get password() {
        return this.registerForm.get('password')!;
    }

    get passwordConfirm() {
        return this.registerForm.get('passwordConfirm')!;
    }

    async tryRegister() {
        this.authService.register(this.email.value, this.password.value, this.username.value).then(cred => {
            this.router.navigate(['/login']);
        }).catch(_ => {
            this.registerForm.setErrors({invalid: true});
        });
    }
}

// validator for the password
export function passwordValidator(control: AbstractControl): ValidationErrors | null {
    // password must be least 8 characters long
    const isLengthValid = control.value.length >= 8;

    if (!isLengthValid) {
        return {
            message: 'Password must be at least 8 characters long'
        }
    }

    // password must contain at least one lowercase letter
    const doesContainLowercase = control.value.match(/[a-z]/);

    if (!doesContainLowercase) {
        return {
            message: 'Password must contain at least one lowercase letter'
        };
    }

    // password must contain at least one uppercase letter
    const doesContainUppercase = control.value.match(/[A-Z]/);

    if (!doesContainUppercase) {
        return {
            message: 'Password must contain at least one uppercase letter'
        };
    }

    // password must contain at least one number
    const doesContainNumber = control.value.match(/\d/);

    if (!doesContainNumber) {
        return {
            message: 'Password must contain at least one number'
        };
    }

    // password must contain at least one special character
    const doesContainSpecial = control.value.match(/\W/);

    if (!doesContainSpecial) {
        return {
            message: 'Password must contain at least one special character'
        };
    }

    // the password is valid
    return null;
}

// validator for password confirmation
function passwordsConfirmValidator(control: AbstractControl): ValidationErrors | null {
    // get the password and password confirm fields
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    // password is confirmed
    if (password?.value === passwordConfirm?.value) {
        return null;
    }

    // password is not confirmed
    return {
        passwordConfirm: true
    };
}