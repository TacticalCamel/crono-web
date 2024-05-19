import {AuthService} from "../services/auth.service";
import {NgIf} from "@angular/common";
import {AbstractControl, FormControl, FormGroup, FormsModule, ValidationErrors, Validators} from "@angular/forms";
import {Component} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Router, RouterLink} from "@angular/router";
import {MatError, MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
    selector: 'route-register',
    standalone: true,
    imports: [
        NgIf,
        FormsModule,
        ReactiveFormsModule,
        RouterLink,
        MatFormField,
        MatError,
        MatLabel,
        MatIcon,
        MatInput,
        MatButton,
        MatPrefix,
        MatProgressSpinner,
    ],
    template: `
        <div class="flex flex-col justify-center items-center p-8">
            <form class="w-full sm:w-96 grid gap-6" [formGroup]="registerForm" (ngSubmit)="tryRegister()">
                <mat-form-field appearance="outline">
                    <mat-icon color="primary" matPrefix>email</mat-icon>
                    <mat-label>Email</mat-label>
                    <input
                        matInput
                        type="email"
                        formControlName="email"
                        required
                    />
                    <mat-error *ngIf="email.getError('required')">Email is required</mat-error>
                    <mat-error *ngIf="email.getError('email')">Email must be in a valid format</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                    <mat-icon color="primary" matPrefix>person</mat-icon>
                    <mat-label>Username</mat-label>
                    <input
                        matInput
                        type="text"
                        formControlName="username"
                        required
                    />
                    <mat-error *ngIf="username.getError('required')">Username is required</mat-error>
                    <mat-error *ngIf="username.getError('minlength')">Username must be at least {{ usernameMinLength }} characters long</mat-error>
                    <mat-error *ngIf="username.getError('maxlength')">Username must be at most {{ usernameMaxLength }} characters long</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                    <mat-icon color="primary" matPrefix>key</mat-icon>
                    <mat-label>Password</mat-label>
                    <input
                        matInput
                        type="password"
                        formControlName="password"
                        required
                    />
                    <mat-error *ngIf="password.getError('message')">{{ password.getError('message') }}</mat-error>
                </mat-form-field>

                <mat-form-field appearance="outline">
                    <mat-icon color="primary" matPrefix>key</mat-icon>
                    <mat-label>Confirm password</mat-label>
                    <input
                        matInput
                        type="password"
                        formControlName="passwordConfirm"
                        required
                    />
                    @if (passwordConfirm.getError('required')) {
                        <mat-error>Confirms password is required</mat-error>
                    } @else if (registerForm.getError('passwordsNotEqual')) {
                        <mat-error>Passwords must match</mat-error>
                    }
                </mat-form-field>

                <div class="flex items-center">
                    <button class="me-8" mat-flat-button color="primary" type="submit" [disabled]="registerForm.invalid">Register</button>
                    <mat-progress-spinner *ngIf="loading" [diameter]="35" mode="indeterminate"/>
                    <mat-error *ngIf="registerForm.getError('invalid')">{{ registerForm.getError('invalid') }}</mat-error>
                </div>

                <a routerLink="/login" class="no-underline hover:underline text-indigo-500 cursor-pointer py-2">Already have an account? Login here.</a>
            </form>
        </div>
    `,
    styles: `
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
        }
    `
})

export class RegisterComponent {
    readonly usernameMinLength: number = 4;
    readonly usernameMaxLength: number = 20;

    registerForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        username: new FormControl('', [Validators.required, Validators.minLength(this.usernameMinLength), Validators.maxLength(this.usernameMaxLength)]),
        password: new FormControl('', [Validators.required, this.passwordValidator]),
        passwordConfirm: new FormControl('', [Validators.required])
    }, {validators: [this.passwordsConfirmValidator]});

    loading: boolean = false;

    constructor(private auth: AuthService, private router: Router) {

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
        // start the loading spinner
        this.loading = true;

        // clear validation errors
        this.registerForm.clearValidators();

        // attempt to register
        this.auth.register(this.email.value, this.password.value, this.username.value)
            .then(_ => {
                // on success, navigate to the home page
                this.router.navigate(['/']);
            })
            .catch(e => {
                // on failure, set a form error
                this.registerForm.setErrors({invalid: e.message});
            });

        // stop the loading spinner
        this.loading = false;
    }

    // validator for the password
    passwordValidator(control: AbstractControl): ValidationErrors | null {
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
    passwordsConfirmValidator(control: AbstractControl): ValidationErrors | null {
        // get the password and password confirm fields
        const password = control.get('password');
        const passwordConfirm = control.get('passwordConfirm');

        // password is not confirmed
        if (password?.value !== passwordConfirm?.value) {
            passwordConfirm?.setErrors({passwordsNotEqual: true})
        }

        return {passwordsNotEqual: true};
    }
}