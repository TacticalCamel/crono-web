import {Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatIcon} from "@angular/material/icon";

@Component({
    selector: 'app-nav-menu',
    standalone: true,
    imports: [
        NgOptimizedImage,
        RouterLink,
        MatNavList,
        MatListItem,
        MatIcon
    ],
    template: `
        <mat-nav-list>
            <a mat-list-item routerLink="/" class="flex">
                <mat-icon>home</mat-icon>
                <span>Crono</span>
            </a>
            <a mat-list-item routerLink="/login" class="btn btn-ghost btn-md text-lg">
                <mat-icon>home</mat-icon>
                <span>Login</span>
            </a>
            <a mat-list-item routerLink="/register" class="btn btn-ghost btn-md text-lg">
                <mat-icon>register</mat-icon>
                <span>Register</span>
            </a>
        </mat-nav-list>
    `
})
export class AppNavMenuComponent {

}