import {Component, EventEmitter, Output} from "@angular/core";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatToolbar} from "@angular/material/toolbar";
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {User} from "@angular/fire/auth";

// TODO angular material-ok használata
//  itt és a login.component.ts-ben összesen van min 10 db

@Component({
    selector: 'app-nav-menu',
    standalone: true,
    imports: [
        NgOptimizedImage,
        RouterLink,
        RouterLinkActive,
        NgIf,
        FormsModule,
        MatNavList,
        MatListItem,
        MatIcon,
        MatButton,
        MatToolbar,
    ],
    template: `
        <mat-toolbar color="primary">
            <!-- nav start -->
            <div class="flex items-center ms-4">
                <img class="me-4 drop-shadow" ngSrc="../../../assets/icon.svg" height="48" width="48" alt="icon" priority/>
                <div *ngIf="currentUser" class="hidden sm:block">
                    <button mat-button routerLink="timeline" routerLinkActive="is-active" class="mx-2">Timeline</button>
                    <button mat-button routerLink="activities" routerLinkActive="is-active" class="mx-2">Activities</button>
                </div>
            </div>

            <!-- nav end -->
            <div class="hidden sm:flex items-center me-4 ms-auto">
                <!-- logged out -->
                <button *ngIf="!currentUser" mat-button routerLink="login" routerLinkActive="is-active" class="mx-2">Login</button>
                <button *ngIf="!currentUser" mat-button routerLink="register" routerLinkActive="is-active" class="mx-2">Register</button>

                <!-- logged in -->
                <button *ngIf="currentUser" mat-button (click)="logout()" class="mx-2">Logout</button>
            </div>

            <!-- mobile nav -->
            <div class="flex sm:hidden items-center ms-auto me-4">
                <mat-icon (click)="toggleDrawer.emit()">menu</mat-icon>
            </div>
        </mat-toolbar>
    `,
    styles: `
        .is-active {
            background: var(--color-accent) !important;
        }
    `
})
export class AppNavMenuComponent {
    @Output() toggleDrawer = new EventEmitter<void>();

    isDarkTheme: boolean;
    currentUser: User | null;

    constructor(private router: Router, private auth: AuthService) {
        this.isDarkTheme = false;
        this.currentUser = null;

        auth.onAuthStateChanged((user: User | null) => {
            this.currentUser = user;
        });
    }

    logout(): void {
        this.auth.logout().then(() => {
            this.router.navigate(['login']);
        });
    }
}