import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
    selector: 'route-index',
    standalone: true,
    imports: [],
    template: `
        <div class="flex flex-col justify-center items-center p-8">
            aaaa
        </div>
    `,
    styles: `
        :host {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
    `
})

export class IndexComponent {
    constructor(public auth: AuthService) {

    }
}
