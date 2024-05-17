import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AppNavMenuComponent} from "./app-nav-menu.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatToolbar} from "@angular/material/toolbar";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

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
        MatListItem,
        MatButton,
        MatSlideToggle,
        NgOptimizedImage,
        RouterLink,
        FormsModule,
    ],
    template: `
        <app-nav-menu/>

        <main class="grow relative">
            <router-outlet/>
        </main>

        <footer class="flex justify-end px-8 py-0.5">
            <a href="https://github.com/TacticalCamel/crono-web">Github repo</a>
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

}