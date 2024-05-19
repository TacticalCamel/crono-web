import {Component} from "@angular/core";
import {CategoryListComponent} from "./shared/category-list/category-list.component";
import {ActivityListComponent} from "./shared/activity-list/activity-list.component";

@Component({
    selector: 'route-activities',
    standalone: true,
    imports: [
        CategoryListComponent,
        ActivityListComponent,
    ],
    template: `
        <div class="h-full max-w-[1280px] mx-auto">
            <category-list/>
            <hr class="border-white border-opacity-25"/>
            <activity-list/>
        </div>
    `,
    styles: `
        :host {
            flex: 1;
        }
    `
})
export class ActivitiesComponent {

}