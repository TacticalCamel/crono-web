import {Component} from "@angular/core";
import {CategoryService} from "../../../services/category.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Category} from "../../../models/Category";
import {MatError, MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {SearchPipe} from "../../../pipes/search.pipe";
import {SortPipe} from "../../../pipes/sort.pipe";

@Component({
    selector: 'category-list',
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
    ],
    templateUrl: './category-list.component.html',
})
export class CategoryListComponent {
    form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required])
    });

    searchField: FormControl = new FormControl('');

    collection: Category[];
    formOpen: boolean;
    updatedId: string | null;
    loading: boolean;

    constructor(private service: CategoryService) {
        this.collection = [];
        this.formOpen = false;
        this.loading = false;
        this.updatedId = null;

        this.service.listen((snapshot) => {
            this.collection = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.get('name')
                };
            });
        });
    }

    get name() {
        return this.form.get('name')!;
    }

    openUpdateForm(entity: Category) {
        this.formOpen = true;
        this.updatedId = entity.id;

        this.name.setValue(entity.name);
    }

    openCreateForm() {
        this.form.reset();

        this.formOpen = true;
        this.updatedId = null;
    }

    async createCategory() {
        // start the loading spinner
        this.loading = true;

        // clear validation errors
        this.form.clearValidators();

        // attempt to create the category
        this.service.create(this.name.value)
            .then(success => {
                if (success) {
                    // clear the form
                    this.name.reset();

                    // close the form
                    this.formOpen = false;
                }
                else {
                    // on failure, set a form error
                    this.form.setErrors({invalid: true});
                }

                // stop the loading spinner
                this.loading = false;
            })
            .catch((e) => {
                // on failure, set a form error
                this.form.setErrors({invalid: e.message});

                // stop the loading spinner
                this.loading = false;
            });
    }

    async updateCategory() {
        if (!this.updatedId) {
            return;
        }

        // start the loading spinner
        this.loading = true;

        // clear validation errors
        this.form.clearValidators();

        const category: Category = {
            id: this.updatedId,
            name: this.name.value
        }

        // attempt to update the category
        this.service.update(category)
            .then(success => {
                if (success) {
                    // clear the form
                    this.name.reset();

                    // close the form
                    this.formOpen = false;
                }
                else {
                    // on failure, set a form error
                    this.form.setErrors({invalid: true});
                }

                // stop the loading spinner
                this.loading = false;
            })
            .catch((e) => {
                // on failure, set a form error
                this.form.setErrors({invalid: e.message});

                // stop the loading spinner
                this.loading = false;
            });
    }

    async deleteCategory(entity: Category) {
        // start the loading spinner
        this.loading = true;

        // attempt to delete the category
        this.service.delete(entity.id)
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