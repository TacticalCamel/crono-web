import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: 'route-index',
    standalone: true,
    imports: [],
    template: `
        <div class="">{{ auth.currentUser?.email ?? 'null' }}</div>
    `
})

export class IndexComponent {
    constructor(public auth: AuthService) {

    }
}
