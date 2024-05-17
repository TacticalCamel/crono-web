import {Component, OnInit} from "@angular/core";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatToolbar} from "@angular/material/toolbar";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'app-nav-menu',
    standalone: true,
    imports: [
        NgOptimizedImage,
        RouterLink,
        MatNavList,
        MatListItem,
        MatIcon,
        MatButton,
        MatSlideToggle,
        MatToolbar,
        FormsModule,
        NgIf,
        RouterLinkActive
    ],
    template: `
        <mat-toolbar color="primary">
            <img class="me-4" ngSrc="../../../assets/icon.svg" height="48" width="48" alt="icon" priority/>
            <button mat-button routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{exact: true}" class="mx-2">Home</button>
            <button *ngIf="!auth.currentUser" mat-button routerLink="/login" routerLinkActive="is-active" class="mx-2">Login</button>
            <button *ngIf="!auth.currentUser" mat-button routerLink="/register" routerLinkActive="is-active" class="mx-2">Register</button>
            <button *ngIf="auth.currentUser" mat-button routerLink="/profile" routerLinkActive="is-active" class="mx-2">Profile</button>
            <button *ngIf="auth.currentUser" mat-button class="mx-2" (click)="logout()">Logout</button>
            <div class="flex items-center ms-auto">
                <mat-slide-toggle [ngModel]="isDarkTheme" (change)="toggleTheme()"></mat-slide-toggle>
                <span class="text-white text-sm mt-1 ms-1">Dark theme</span>
            </div>
        </mat-toolbar>
    `,
    styles: `
        .is-active {
            background: #dd9020 !important;
        }
    `
})
export class AppNavMenuComponent implements OnInit{
    readonly darkThemeClass: string = 'dark-theme';

    isDarkTheme: boolean;

    constructor(private router: Router, public auth: AuthService) {
        this.isDarkTheme = false;
    }

    ngOnInit() {
        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add(this.darkThemeClass);
            this.isDarkTheme = true;
        }
        else{
            this.isDarkTheme = false;
        }
    }

    toggleTheme() {
        if(this.isDarkTheme) {
            this.setLightTheme();
        }
        else {
            this.setDarkTheme();
        }
    }

    setLightTheme(){
        document.body.classList.remove(this.darkThemeClass);
        this.isDarkTheme = false;
    }

    setDarkTheme(){
        document.body.classList.add(this.darkThemeClass);
        this.isDarkTheme = true;
    }

    logout(){
        this.auth.logout().then(() => {
            this.router.navigate(['login']);
        });
    }
}