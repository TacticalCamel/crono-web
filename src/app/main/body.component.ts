import {Component} from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
    selector: 'app-body',
    standalone: true,
    imports: [
        RouterOutlet
    ],
    template: `
        
    `,
    styles: `
        :host{
            flex-grow: 1;
        }
    `
})

export class BodyComponent {

}
