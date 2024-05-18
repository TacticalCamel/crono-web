import {Component} from "@angular/core";
import {CategoryService} from "../services/category.service";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {Category} from "../models/Category";
import {MatError, MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
    selector: 'app-activities',
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
    ],
    template: `
        <div class="h-full">
            <div class="p-4">
                <!-- header -->
                <div class="flex items-center py-2 mb-4">
                    <div class="text-xl me-4">Categories</div>
                    <div class="p-1 pb-0">
                        <mat-icon *ngIf="!formOpen" (click)="formOpen = true" class="hover:text-green-500 transition-colors">add</mat-icon>
                        <mat-icon *ngIf="formOpen" (click)="formOpen = false" class="hover:text-red-500 transition-colors">clear</mat-icon>
                    </div>
                </div>

                <!-- create category -->
                <form *ngIf="formOpen" [formGroup]="categoryForm" class="flex items-center mb-4">
                    <!-- name -->
                    <mat-form-field appearance="outline">
                        <mat-icon color="primary" matPrefix>toc</mat-icon>
                        <mat-label>Name</mat-label>
                        <input
                            matInput
                            type="text"
                            required
                            formControlName="name"
                        />
                        <mat-error *ngIf="name.getError('required')">Name is required</mat-error>
                    </mat-form-field>

                    <!-- submit -->
                    <div class="flex items-center mb-4 ms-8">
                        <button *ngIf="!updatedId" class="me-8" mat-flat-button color="primary" (click)="createCategory()" [disabled]="name.invalid">Create</button>
                        <button *ngIf="updatedId" class="me-8" mat-flat-button color="primary" (click)="updateCategory()" [disabled]="name.invalid">Update</button>
                        @if (loading) {
                            <mat-progress-spinner [diameter]="35" mode="indeterminate"/>
                        } @else if (name.getError('invalid')) {
                            <mat-error>Invalid data</mat-error>
                        }
                    </div>
                </form>

                <!-- category list -->
                <div *ngIf="!formOpen" class="flex flex-wrap">
                    <div *ngIf="!collection.length">No data</div>
                    <div *ngFor="let category of collection">
                        <div class="flex items-center px-2 py-1 border border-solid border-amber-500 rounded-lg m-2">
                            <span class="px-4 py-1 transition-colors hover:text-amber-500 cursor-pointer" (click)="openUpdateForm(category)">{{ category.name }}</span>
                            <mat-icon class="transition-colors hover:text-red-500 cursor-pointer" (click)="deleteCategory(category)">clear</mat-icon>
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
export class ActivitiesComponent {
    categoryForm: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required])
    });

    collection: Category[];
    formOpen: boolean;
    updatedId: string | null;
    loading: boolean;

    constructor(private categories: CategoryService) {
        this.collection = [];
        this.formOpen = false;
        this.loading = false;
        this.updatedId = null;

        this.categories.listen((snapshot) => {
            this.collection = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    name: doc.get('name')
                };
            });
        });
    }

    get name() {
        return this.categoryForm.get('name')!;
    }

    openUpdateForm(entity: Category) {
        this.formOpen = true;
        this.updatedId = entity.id;

        this.name.setValue(entity.name);
    }

    async createCategory() {
        // start the loading spinner
        this.loading = true;

        // clear validation errors
        this.categoryForm.clearValidators();

        // attempt to create the category
        this.categories.create(this.name.value)
            .then(success => {
                if (success) {
                    // clear the form
                    this.name.reset();

                    // close the form
                    this.formOpen = false;
                }
                else {
                    // on failure, set a form error
                    this.categoryForm.setErrors({invalid: true});
                }

                // stop the loading spinner
                this.loading = false;
            })
            .catch((e) => {
                // on failure, set a form error
                this.categoryForm.setErrors({invalid: e.message});

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
        this.categoryForm.clearValidators();

        const category: Category = {
            id: this.updatedId,
            name: this.name.value
        }

        // attempt to update the category
        this.categories.update(category)
            .then(success => {
                if (success) {
                    // clear the form
                    this.name.reset();

                    // close the form
                    this.formOpen = false;
                }
                else {
                    // on failure, set a form error
                    this.categoryForm.setErrors({invalid: true});
                }

                // stop the loading spinner
                this.loading = false;
            })
            .catch((e) => {
                // on failure, set a form error
                this.categoryForm.setErrors({invalid: e.message});

                // stop the loading spinner
                this.loading = false;
            });
    }

    async deleteCategory(entity: Category) {
        // start the loading spinner
        this.loading = true;

        // attempt to delete the category
        this.categories.delete(entity.id)
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