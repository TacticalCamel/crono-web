import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        NgOptimizedImage
    ],
    template: `
        <header>
            <nav class="navbar bg-neutral">
                <div class="navbar-start">
                    <img ngSrc="../../assets/icon48.png" height="48" width="48" alt="icon"/>
                    <span class="ps-3 text-4xl font-semibold text-gray-200">Crono</span>
                </div>
                <div class="navbar-end">
                    <span>Profile</span>
                </div>
            </nav>
        </header>
    `
})

export class HeaderComponent {

}
