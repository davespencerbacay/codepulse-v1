import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AddCategoryRequest } from '../models/category-model';
import { CategoryService } from '../services/category-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.categoryService.addCategoryStatus() === 'success') {
        this.categoryService.addCategoryStatus.set('idle');
        this.router.navigate(['/admin', 'categories']);
      }

      if (this.categoryService.addCategoryStatus() === 'error') {
        console.log('Failed to add category');
      }
    });
  }

  private categoryService = inject(CategoryService);

  addCategoryFormGroup = new FormGroup({
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
    return this.addCategoryFormGroup.controls.categoryName;
  }
  get urlHandleFormControl() {
    return this.addCategoryFormGroup.controls.urlHandle;
  }

  onSubmit() {
    const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();
    const addCategoryRequestDto: AddCategoryRequest = {
      name: addCategoryFormValue.categoryName,
      urlHandle: addCategoryFormValue.urlHandle,
    };

    this.categoryService.addCategory(addCategoryRequestDto);
  }
}
