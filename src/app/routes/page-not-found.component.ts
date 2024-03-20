import { Component } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  template: `
      <div class="flex flex-col lg:flex-row items-center justify-evenly h-full">
          <div class="flex justify-center flex-col">
              <div class="font-mono text-9xl text-rose-600 mb-4 text-center">404</div>
              <div class="capitalize text-3xl text-gray-300 font-bold text-center font-mono">page not found</div>
          </div>
          <div>
              <div class="text-3xl text-gray-300 text-center">Cry about it ...</div>
              <div class="flex justify-center my-4 lg:my-10">
                  <img ngSrc="../../assets/cry-about-it.png" alt="cry about it" height="216" width="477" priority/>
              </div>
              <div class="text-3xl text-gray-300 text-center">
                ... or go back to the <a href="/" class="link link-info">index page</a>
              </div>
          </div>
      </div>
  `,
  styles: `
      :host {
          min-height: 100%;
      }
  `
})
export class PageNotFoundComponent {

}
