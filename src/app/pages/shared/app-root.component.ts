import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AppNavMenuComponent} from "./app-nav-menu.component";
import {AppFooterComponent} from "./app-footer.component";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MatButton} from "@angular/material/button";
import {AppSidenavComponent} from "./app-sidenav.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        AppNavMenuComponent,
        AppFooterComponent,
        MatDrawerContainer,
        MatDrawerContent,
        MatDrawer,
        MatButton,
        AppSidenavComponent
    ],
    template: `
        <div class="h-screen w-screen flex flex-col">
            <app-nav-menu (toggleDrawer)="this.drawer.toggle()"/>

            <mat-drawer-container class="grow relative overflow-y-auto" autosize>
                <mat-drawer #drawer mode="over">
                    <app-sidenav (closeDrawer)="this.drawer.close()"/>
                </mat-drawer>

                <mat-drawer-content class="h-full">
                    <main class="h-full flex flex-col">
                        <router-outlet/>
                        <app-footer/>
                    </main>
                </mat-drawer-content>
            </mat-drawer-container>
        </div>
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

        main {
            background-color: #171820;
        }

        main::-webkit-scrollbar {
            width: 12px;
        }

        main::-webkit-scrollbar-thumb {
            background-color: #4B5563;
            border-radius: 6px;
            border: 3px solid #303030;
        }

        main::-webkit-scrollbar-track {
            background-color: #303030;
        }
    `
})

export class AppRootComponent {

}