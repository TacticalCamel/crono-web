import { Component } from '@angular/core';
import {HeaderComponent} from "../main/header.component";
import {FooterComponent} from "../main/footer.component";

@Component({
  selector: 'route-index',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  template: `
    <app-header/>
    <main class="grow mt-16">
        <div></div>
    </main>
    <app-footer/>
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
