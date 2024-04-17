import { Component } from '@angular/core';
import {PageHeaderComponent} from "../shared/page-header.component";
import {PageFooterComponent} from "../shared/page-footer.component";

@Component({
    selector: 'route-index',
    standalone: true,
    imports: [
        PageHeaderComponent,
        PageFooterComponent
    ],
    template: `
        <page-header/>
        <main class="grow mt-16">
            <div></div>
        </main>
        <page-footer/>
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

export class IndexComponent {

}
