import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppNavMenuComponent} from "./app-nav-menu.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        AppNavMenuComponent,
        MatIcon,
        MatIconButton,
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent,
        MatToolbar,
        MatNavList,
        MatListItem
    ],
    template: `
        <mat-sidenav-container>
            <mat-sidenav-content>
                <mat-toolbar color="primary">
                    <div class="sm:hidden">
                        <button mat-icon-button (click)="toggleSideBar(sidenav)">
                            <mat-icon>menu</mat-icon>
                        </button>
                    </div>
                    <div class="hidden sm:flex">
                        <app-nav-menu/>
                    </div>
                </mat-toolbar>
            </mat-sidenav-content>
        </mat-sidenav-container>

        <main class="grow">
            <mat-sidenav class="w-96" position="end" mode="push" #sidenav>
                <app-nav-menu/>
            </mat-sidenav>
            <router-outlet/>
        </main>

        <footer class="bg-neutral flex justify-end px-8 py-0.5">
            <a class="link link-primary" href="https://github.com/TacticalCamel/crono-web">Github repo</a>
        </footer>
    `,
    styles: `
        :host {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
        }
    `
})

export class AppRootComponent {
    toggleSideBar(sidenav: MatSidenav) {
        sidenav.toggle();
    }
}
