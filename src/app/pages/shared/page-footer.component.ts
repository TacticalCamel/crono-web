import {Component} from '@angular/core';

@Component({
    selector: 'page-footer',
    standalone: true,
    imports: [],
    template: `
        <footer class="bg-neutral flex justify-end px-8 py-0.5">
            <a class="link link-primary" href="https://github.com/TacticalCamel/crono-web">https://github.com/TacticalCamel/crono-web</a>
        </footer>
    `
})

export class PageFooterComponent {

}