import {Component} from '@angular/core';

@Component({
    selector: 'app-profile',
    standalone: true,
    imports: [],
    template: `
        <div class="flex flex-col justify-center items-center p-8">
            profile works!
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
export class ProfileComponent {

}
