import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {PageFooterComponent} from "./page-footer.component";

@Component({
    selector: 'page-not-found',
    standalone: true,
    imports: [
        NgOptimizedImage,
        PageFooterComponent
    ],
    template: `
        <main class="size-full flex flex-col">
            <div class="flex grow flex-col items-center justify-evenly bg-black bg-opacity-25 p-4">
                <div class="flex justify-center flex-col font-mono text-center">
                    <div class="text-9xl text-rose-600 mb-4">404</div>
                    <div class="capitalize text-3xl text-gray-300 font-bold">page not found</div>
                </div>
                <div>
                    <div class="text-3xl text-gray-400 text-center">Cry about it ...</div>
                    <div class="flex justify-center my-4">
                        <img ngSrc="../../../assets/cry-about-it.webp" alt="cry about it" height="216" width="477" priority/>
                    </div>
                    <div class="text-3xl text-gray-400 text-center">
                        ... or go back to the <a href="/" class="link link-info">index page</a>
                    </div>
                </div>
            </div>
            <page-footer/>
        </main>
    `,
    styles: `
        :host {
            min-height: 100%;
        }
    `
})

export class PageNotFoundComponent {

}