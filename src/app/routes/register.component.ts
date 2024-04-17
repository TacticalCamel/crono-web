import {Component} from '@angular/core';
import {getAuth, createUserWithEmailAndPassword, User, Auth, UserCredential} from "firebase/auth";

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
    undef: undefined = undefined;
    auth: Auth = getAuth();
    email: string = '';
    password: string = '';
    passwordConfirm: string = '';

    tryRegister(): void {
        if (this.password !== this.passwordConfirm) {
            console.log(`error: passwords do not match`);
            return;
        }

        createUserWithEmailAndPassword(this.auth, this.email, this.password)
            .then((userCredential: UserCredential): void => {
                // Signed up
                const user: User = userCredential.user;

                console.log(`success: ${user}`);
            })
            .catch((error): void => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.log(`error ${errorCode}: ${errorMessage}`);
            });
    }
}