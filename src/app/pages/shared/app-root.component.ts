import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {AppNavMenuComponent} from "./app-nav-menu.component";
import {AppFooterComponent} from "./app-footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        AppNavMenuComponent,
        AppFooterComponent
    ],
    template: `
        <div class="h-screen w-screen flex flex-col">
            <app-nav-menu/>

            <main class="grow relative overflow-y-auto flex flex-col">
                <router-outlet/>
                <app-footer/>
            </main>
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