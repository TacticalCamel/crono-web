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

@Component({
    selector: 'app-sidenav',
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
        <div class="w-60">
            <!-- nav start -->
            <div *ngIf="currentUser" class="grid gap-4 mt-4 mb-16">
                <button mat-button routerLink="timeline" routerLinkActive="is-active" (click)="closeDrawer.emit()" class="mx-2">Timeline</button>
                <button mat-button routerLink="activities" routerLinkActive="is-active" (click)="closeDrawer.emit()" class="mx-2">Activities</button>
            </div>

            <!-- nav end -->
            <div class="grid gap-4 mb-4">
                <!-- logged out -->
                <button *ngIf="!currentUser" mat-button routerLink="login" (click)="closeDrawer.emit()" routerLinkActive="is-active" class="mx-2">Login</button>
                <button *ngIf="!currentUser" mat-button routerLink="register" (click)="closeDrawer.emit()" routerLinkActive="is-active" class="mx-2">Register</button>

                <!-- logged in -->
                <button *ngIf="currentUser" mat-button (click)="logout()" class="mx-2">Logout</button>
            </div>
        </div>
    `,
    styles: `
        .is-active {
            background: var(--color-accent) !important;
        }
    `
})
export class AppSidenavComponent {
    @Output() closeDrawer: EventEmitter<void>;
    currentUser: User | null;

    constructor(private router: Router, private auth: AuthService) {
        this.currentUser = null;
        this.closeDrawer = new EventEmitter<void>();

        auth.onAuthStateChanged((user: User | null) => {
            this.currentUser = user;
        });
    }

    logout(): void {
        this.auth.logout().then(() => {
            this.closeDrawer.emit();
            this.router.navigate(['login']);
        });
    }
}