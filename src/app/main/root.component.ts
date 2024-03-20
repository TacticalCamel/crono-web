import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header.component";
import {FooterComponent} from "./footer.component";
import {BodyComponent} from "./body.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HeaderComponent, BodyComponent, FooterComponent],
    template: `
        <router-outlet/>
    `,
    styles: `
        :host{
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

export class RootComponent {

}
