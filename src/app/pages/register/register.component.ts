import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {UserModel} from "../../models/user.model";

@Component({
    selector: 'route-register',
    standalone: true,
    imports: [],
    template: `
        <main>
            <input type="email" [value]="email"/>
            <input type="password" [value]="password"/>
            <input type="password" [value]="passwordConfirm"/>
            <button (click)="tryRegister()">Register</button>
        </main>
    `,
    styles: `
    `
})

export class RegisterComponent {
    email: string = '';
    password: string = '';
    passwordConfirm: string = '';
    username: string = '';

    constructor(private authService: AuthService) {
    }

    tryRegister(): void {
        if (this.password !== this.passwordConfirm) {
            console.log(`error: passwords do not match`);
            return;
        }

        const model: UserModel = new UserModel('', this.email, this.password, this.username);

        this.authService.register(model)
            .then((result: boolean): void => {
                console.log(result ? "success" : "fail");
            });
    }
}