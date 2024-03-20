import { Component } from '@angular/core';
import {HeaderComponent} from "../main/header.component";

@Component({
  selector: 'route-index',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  template: `
    <app-header/>
    <p>
      Index works!
    </p>
  `
})

export class IndexComponent {

}
