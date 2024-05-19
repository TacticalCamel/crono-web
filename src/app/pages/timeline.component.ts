import {Component} from '@angular/core';
import {EventService} from "../services/event.service";
import {KeyValuePipe, NgFor, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {SearchPipe} from "../pipes/search.pipe";
import {SortPipe} from "../pipes/sort.pipe";
import {Router, RouterLink} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {EventView} from "../models/EventView";
import {Activity} from "../models/Activity";
import {ActivityService} from "../services/activity.service";

@Component({
    selector: 'route-timeline',
    standalone: true,
    imports: [
        NgFor,
        MatIcon,
        NgIf,
        SearchPipe,
        SortPipe,
        RouterLink,
        FormsModule,
        MatFormField,
        MatInput,
        MatLabel,
        MatPrefix,
        ReactiveFormsModule,
        KeyValuePipe
    ],
    template: `
        <div class="h-full max-w-[1280px] mx-auto">
            <div class="p-4 sm:p-8">
                <!-- header -->
                <div class="flex items-center justify-between">
                    <!-- title -->
                    <div class="flex items-center px-4 mb-5 h-14 bg-white bg-opacity-10 rounded grow me-4 sm:me-8 -mt-0.5">
                        <div class="text-xl me-4 sm:me-8 py-2">Timeline</div>
                    </div>

                    <!-- search -->
                    <mat-form-field appearance="outline">
                        <mat-icon color="primary" matPrefix>search</mat-icon>
                        <mat-label>Search</mat-label>
                        <input
                            matInput
                            type="text"
                            [formControl]="searchField"
                        />
                    </mat-form-field>
                </div>

                <!-- event list -->
                <div class="">
                    <div *ngIf="!events.size">
                        <span class="p-3">No items found.</span>
                        <span class="hover:underline transition-colors text-amber-500 p-3 cursor-pointer ms-2" (click)="goToActivities()">Start an activity</span>
                    </div>
                    <div *ngFor="let entry of events | keyvalue">
                        <div class="text-lg font-semibold mb-2">{{ entry.key }}</div>

                        <div *ngFor="let event of entry.value" class="p-2 border-solid border-0 border-s-2 border-amber-500 ms-2 mb-4">
                            <div class="flex items-center">
                                <span>{{ event.start }}</span>
                                <span class="mx-1">-</span>
                                <span>{{ event.end }}</span>
                                <span class="ms-2 font-light text-white opacity-60 text-sm">({{ event.duration }})</span>
                            </div>

                            <div class="mt-4 ms-2 grid gap-2">
                                <div>
                                    <span>{{ event.name }}</span>
                                    @if (event.category) {
                                        <span class="mx-2">-</span>
                                        <span>{{ event.category }}</span>
                                    }
                                </div>
                                <div>
                                    Score: {{ event.score }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: `
        :host {
            flex: 1;
        }
    `
})

export class TimelineComponent {
    searchField: FormControl = new FormControl('');
    events: Map<string, EventView[]> = new Map();

    static readonly months: string[] = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    constructor(private eventService: EventService, private activityService: ActivityService, private router: Router) {
        this.events = new Map();

        this.eventService.listen(snapshot => {
            snapshot.docChanges().forEach(async change => {
                const doc = change.doc;

                const start: number | null = doc.get('start');
                const end: number | null = doc.get('end');

                const startDate: Date = start ? new Date(start) : new Date(Date.now());
                const endDate: Date = end ? new Date(end) : new Date(Date.now());

                const month: string = TimelineComponent.months[startDate.getMonth()];
                const day: string = String(startDate.getDate());

                const key: string = `${month} ${day}`;

                const activityId: string = doc.get('activityId');
                const activity: Activity | null = await this.activityService.readOne(activityId);

                if (!activity) {
                    return;
                }

                const value = {
                    id: doc.id,
                    start: this.formatTime(startDate),
                    end: this.formatTime(endDate),
                    duration: this.formatTimeDelta(startDate.getTime(), endDate.getTime()),
                    name: activity.name,
                    category: activity.categoryId,
                    score: activity.score
                };

                if (change.type === 'added') {
                    if (!this.events.has(key)) {
                        this.events.set(key, [value]);
                    }
                    else {
                        this.events.get(key)!.push(value);
                    }
                }
                else if (this.events.has(key)) {
                    const index = this.events.get(key)!.findIndex(event => event.id === doc.id);

                    if (change.type === 'modified') {
                        this.events.get(key)![index] = value;
                    }
                    if (change.type === 'removed') {
                        this.events.get(key)!.splice(index, 1);

                        if (!this.events.get(key)!.length) {
                            this.events.delete(key);
                        }
                    }
                }
            });
        });
    }

    goToActivities() {
        this.router.navigate(['activities']);
    }

    formatTime(date: Date) {
        const hours: string = String(date.getHours()).padStart(2, '0');
        const minutes: string = String(date.getMinutes()).padStart(2, '0');

        return `${hours}:${minutes}`;
    }

    formatTimeDelta(start: number, end: number) {
        const diffMilliseconds = Math.abs(end - start);
        const diffSeconds = Math.floor(diffMilliseconds / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);

        const hours = Math.floor(diffMinutes / 60);
        const minutes = diffMinutes % 60;
        const seconds = diffSeconds % 60;

        let result = "";

        if (hours > 0) {
            result += `${hours}h `;
        }

        if (minutes > 0 || hours > 0) {
            result += `${minutes}m `;
        }

        if (hours === 0) {
            result += `${seconds}s`;
        }

        return result.trim();
    }
}
