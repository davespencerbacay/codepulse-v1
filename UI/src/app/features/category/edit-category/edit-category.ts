import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  constructor() {
    effect(() => {
      if (this.categoryService.editCategoryStatus() === 'success') {
        this.categoryService.editCategoryStatus.set('idle');
        this.router.navigate(['/admin', 'categories']);
      }

      if (this.categoryService.editCategoryStatus() === 'error') {
        this.categoryService.editCategoryStatus.set('idle');
        console.error('Failed to edit category');
      }
    });
  }

  id = input<string>();

  private categoryService = inject(CategoryService);
  private router = inject(Router);

  categoryResourceRef = this.categoryService.getCategoryById(this.id);
  categoryResponse = this.categoryResourceRef.value;

  editCategoryFormGroup = new FormGroup({
    categoryName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(30)],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(30)],
    }),
  });

  get nameFormControl() {
    return this.editCategoryFormGroup.controls.categoryName;
  }
  get urlHandleFormControl() {
    return this.editCategoryFormGroup.controls.urlHandle;
  }

  effectRef = effect(() => {
    this.editCategoryFormGroup.controls.categoryName.patchValue(
      this.categoryResponse()?.name ?? ''
    );
    this.editCategoryFormGroup.controls.urlHandle.patchValue(
      this.categoryResponse()?.urlHandle ?? ''
    );
  });

  onSubmit() {
    const categoryId = this.id();
    if (!this.editCategoryFormGroup.valid || !categoryId) {
      return;
    }

    const formRawValue = this.editCategoryFormGroup.getRawValue();
    this.categoryService.updateCategory(categoryId, {
      name: formRawValue.categoryName,
      urlHandle: formRawValue.urlHandle,
    });
  }
}
