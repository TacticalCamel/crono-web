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
import {User} from "@angular/fire/auth";

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
            <!-- nav start -->
            <div class="flex items-center ms-4">
                <img class="me-4 drop-shadow" ngSrc="../../../assets/icon.svg" height="48" width="48" alt="icon" priority/>
                <button mat-button routerLink="/" routerLinkActive="is-active" [routerLinkActiveOptions]="{exact: true}" class="mx-2">Home</button>
                <button mat-button *ngIf="currentUser" routerLink="activities" routerLinkActive="is-active" class="mx-2">Activities</button>
            </div>

            <!-- nav end -->
            <div class="flex items-center me-4 ms-auto">
                <!-- logged out -->
                <button *ngIf="!currentUser" mat-button routerLink="/login" routerLinkActive="is-active" class="mx-2">Login</button>
                <button *ngIf="!currentUser" mat-button routerLink="/register" routerLinkActive="is-active" class="mx-2">Register</button>

                <!-- logged in -->
                <button *ngIf="currentUser" mat-button routerLink="/profile" routerLinkActive="is-active" class="mx-2">Profile</button>
                <button *ngIf="currentUser" mat-button (click)="logout()" class="mx-2">Logout</button>

                <!-- theme switch -->
                <div class="mb-1 me-1 ms-10">
                    <mat-slide-toggle [ngModel]="isDarkTheme" (change)="toggleTheme()"></mat-slide-toggle>
                </div>
                <div class="text-white text-sm">Dark theme</div>
            </div>
        </mat-toolbar>
    `,
    styles: `
        .is-active {
            background: var(--color-accent) !important;
        }
    `
})
export class AppNavMenuComponent implements OnInit {
    readonly darkThemeClass: string = 'dark-theme';

    isDarkTheme: boolean;
    currentUser: User | null;

    constructor(private router: Router, private auth: AuthService) {
        this.isDarkTheme = false;
        this.currentUser = null;

        auth.onAuthStateChanged((user: User | null) => {
            this.currentUser = user;
        });
    }

    ngOnInit(): void {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add(this.darkThemeClass);
            this.isDarkTheme = true;
        }
        else {
            this.isDarkTheme = false;
        }
    }

    toggleTheme(): void {
        if (this.isDarkTheme) {
            this.setLightTheme();
        }
        else {
            this.setDarkTheme();
        }
    }

    setLightTheme(): void {
        document.body.classList.remove(this.darkThemeClass);
        this.isDarkTheme = false;
    }

    setDarkTheme(): void {
        document.body.classList.add(this.darkThemeClass);
        this.isDarkTheme = true;
    }

    logout(): void {
        this.auth.logout().then(() => {
            this.router.navigate(['login']);
        });
    }
}