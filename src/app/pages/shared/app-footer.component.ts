import {Component} from "@angular/core";
import {MatToolbar} from "@angular/material/toolbar";

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [
        MatToolbar
    ],
    template: `
        <footer class="mx-8 p-2 flex items-center justify-end">
            <a class="text-white no-underline hover:underline" href="https://github.com/TacticalCamel/crono-web" target="_blank">github.com/TacticalCamel/crono-web</a>
        </footer>
    `,
    styles: `
        footer {
            border-top: 1px solid #ffffff55 !important;
        }
    `
})
export class AppFooterComponent {

}