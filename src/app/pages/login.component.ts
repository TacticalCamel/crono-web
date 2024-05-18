import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {MatError, MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
    selector: 'route-login',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgIf,
        MatFormField,
        MatLabel,
        MatInput,
        MatError,
        MatButton,
        MatIcon,
        MatPrefix,
        MatProgressSpinner,
        RouterLink
    ],
    template: `
        <div class="flex flex-col justify-center items-center p-8">
            <form class="w-full sm:w-96 grid gap-6" [formGroup]="loginForm" (ngSubmit)="tryLogin()">
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
                    <mat-error *ngIf="password.getError('required')">Password is required</mat-error>
                </mat-form-field>

                <div class="flex items-center">
                    <button class="me-8" mat-flat-button color="primary" type="submit" [disabled]="email.invalid || password.invalid">Login</button>
                    @if(loading){
                        <mat-progress-spinner [diameter]="35" mode="indeterminate"/>
                    }
                    @else if(loginForm.getError('invalid')){
                        <mat-error>Invalid login credentials</mat-error>
                    }
                </div>

                <a routerLink="/register" class="no-underline hover:underline text-indigo-500 cursor-pointer py-2">Don't have an account? Register here.</a>
            </form>
        </div>
    `,
    styles: `
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
    `
})

export class LoginComponent {
    loginForm: FormGroup = new FormGroup({
        email: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required])
    });

    loading: boolean = false;

    constructor(private auth: AuthService, private router: Router) {

    }

    get email() {
        return this.loginForm.get('email')!;
    }

    get password() {
        return this.loginForm.get('password')!;
    }

    async tryLogin() {
        // start the loading spinner
        this.loading = true;

        // clear validation errors
        this.loginForm.clearValidators();

        // attempt to login
        this.auth.login(this.email.value, this.password.value)
            .then(_ => {
                // on success, navigate to the home page
                this.router.navigate(['/']);
            })
            .catch(_ => {
                // on failure, set a form error
                this.loginForm.setErrors({invalid: true});
            });

        // stop the loading spinner
        this.loading = false;
    }
}
