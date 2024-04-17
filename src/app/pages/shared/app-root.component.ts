import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {PageHeaderComponent} from "./page-header.component";
import {PageFooterComponent} from "./page-footer.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, PageHeaderComponent, PageFooterComponent],
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

export class AppRootComponent {

}
