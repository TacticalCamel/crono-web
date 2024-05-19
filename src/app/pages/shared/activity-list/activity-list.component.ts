import {Component, OnDestroy, OnInit} from "@angular/core";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SearchPipe} from "../../../pipes/search.pipe";
import {SortPipe} from "../../../pipes/sort.pipe";
import {ActivityService} from "../../../services/activity.service";
import {Activity} from "../../../models/Activity";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatSort, MatSortHeader} from "@angular/material/sort";
import {CategoryService} from "../../../services/category.service";
import {Category} from "../../../models/Category";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {map, Observable, startWith, Subscription} from "rxjs";
import {EventService} from "../../../services/event.service";

@Component({
    selector: 'activity-list',
    standalone: true,
    imports: [
        NgIf,
        NgForOf,
        MatIcon,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatPrefix,
        ReactiveFormsModule,
        MatButton,
        MatProgressSpinner,
        SearchPipe,
        SortPipe,
        MatSlideToggle,
        MatSort,
        MatSortHeader,
        MatAutocomplete,
        MatOption,
        MatAutocompleteTrigger,
        AsyncPipe
    ],
    templateUrl: './activity-list.component.html',
    styles: `
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    `
})
export class ActivityListComponent implements OnInit, OnDestroy {
    form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        score: new FormControl(0, [Validators.required]),
        category: new FormControl(''),
        isFixedScore: new FormControl(false)
    });

    searchField: FormControl = new FormControl('');

    activities: Activity[];
    categories: Category[];
    filteredCategories: Observable<Category[]>;
    filterSubscription: Subscription | null = null

    formOpen: boolean;
    updatedId: string | null;
    loading: boolean;

    constructor(private activityService: ActivityService, private categoryService: CategoryService, private eventService: EventService) {
        this.activities = [];
        this.categories = [];
        this.filteredCategories = new Observable<Category[]>();

        this.formOpen = false;
        this.loading = false;
        this.updatedId = null;

        this.activityService.listen((snapshot) => {
            this.activities = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.get('name'),
                    score: doc.get('score'),
                    categoryId: doc.get('categoryId'),
                    isFixedScore: doc.get('isFixedScore')
                };
            });
        });

        this.categoryService.listen((snapshot) => {
            this.categories = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.get('name')
                };
            });
        });
    }

    ngOnInit() { // TODO lifecycle hook 1
        this.filteredCategories = this.category.valueChanges.pipe(
            startWith(''),
            map(value => this.filterCategories(value || ''))
        );

        this.filterSubscription = this.filteredCategories.subscribe();
    }

    ngOnDestroy() { // TODO lifecycle hook 2
        this.filterSubscription?.unsubscribe();
    }

    private filterCategories(value: string): Category[] {
        const filterValue = value.toLowerCase();

        return this.categories.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    get name() {
        return this.form.get('name')!;
    }

    get score() {
        return this.form.get('score')!;
    }

    get category() {
        return this.form.get('category')!;
    }

    get isFixedScore() {
        return this.form.get('isFixedScore')!;
    }

    openCreateForm() {
        this.form.reset();

        this.formOpen = true;
        this.updatedId = null;
    }

    openUpdateForm(entity: Activity) {
        this.formOpen = true;
        this.updatedId = entity.id;

        this.name.setValue(entity.name);
        this.score.setValue(entity.score);
        this.isFixedScore.setValue(entity.isFixedScore);
        this.category.setValue(entity.categoryId);
    }

    async startActivity(entity: Activity) {
        await this.eventService.create(entity);
    }

    async createActivity() {
        this.loading = true;

        this.form.clearValidators();

        this.activityService.create(this.name.value, this.score.value, this.isFixedScore.value)
            .then(success => {
                if (success) {
                    this.name.reset();
                    this.formOpen = false;
                }
                else {
                    this.form.setErrors({invalid: true});
                }

                this.loading = false;
            })
            .catch((e) => {
                this.form.setErrors({invalid: e.message});

                this.loading = false;
            });
    }

    async updateActivity() {
        if (!this.updatedId) {
            return;
        }

        this.loading = true;

        this.form.clearValidators();

        const activity: Activity = {
            id: this.updatedId,
            name: this.name.value,
            score: this.score.value,
            categoryId: this.category.value,
            isFixedScore: this.isFixedScore.value
        }

        this.activityService.update(activity)
            .then(success => {
                if (success) {
                    this.name.reset();
                    this.formOpen = false;
                }
                else {
                    this.form.setErrors({invalid: true});
                }

                this.loading = false;
            })
            .catch((e) => {
                this.form.setErrors({invalid: e.message});
                this.loading = false;
            });
    }

    async deleteActivity(entity: Activity) {
        // start the loading spinner
        this.loading = true;

        // attempt to delete the activity
        this.activityService.delete(entity.id)
            .then(_ => {
                // stop the loading spinner
                this.loading = false;
            })
            .catch(_ => {
                // stop the loading spinner
                this.loading = false;
            });
    }
}