import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogsService } from '../services/blogs-service';
import { AddBlogRequest } from '../models/Blogs.model';
import { Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';
import { ImageSelectorService } from '../../../shared/services/image-selector-service';

@Component({
  selector: 'app-add-blog',
  imports: [ReactiveFormsModule, MarkdownComponent],
  templateUrl: './add-blog.html',
  styleUrl: './add-blog.css',
})
export class AddBlog {
  blogService = inject(BlogsService);
  categoryService = inject(CategoryService);
  router = inject(Router);
  private categoriesResourceRef = this.categoryService.getAllCategories();
  categoriesResponse = this.categoriesResourceRef.value;

  imageSelectorService = inject(ImageSelectorService);

  addBlogPostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(30), Validators.maxLength(50)],
    }),
    shortDescription: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(100), Validators.maxLength(300)],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(500), Validators.maxLength(5000)],
    }),
    featuredImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i),
      ],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)],
    }),
    publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    }),
    isVisible: new FormControl<boolean>(true, {
      nonNullable: true,
    }),
    categories: new FormControl<string[]>([], {
      nonNullable: true,
    }),
  });

  selectedImageEffectRef = effect(() => {
    const selectedImageUrl = this.imageSelectorService.selectedImage();
    if (selectedImageUrl) {
      this.addBlogPostForm.patchValue({
        featuredImageUrl: selectedImageUrl,
      });
    }
  });

  onSubmit() {
    const formRawValue = this.addBlogPostForm.getRawValue();
    const requestDto: AddBlogRequest = {
      title: formRawValue.title,
      shortDescription: formRawValue.shortDescription,
      content: formRawValue.content,
      featuredImageUrl: formRawValue.featuredImageUrl,
      urlHandle: formRawValue.urlHandle,
      publishedDate: formRawValue.publishedDate,
      author: formRawValue.author,
      isVisible: formRawValue.isVisible,
      categories: formRawValue.categories ?? [],
    };

    this.blogService.createBlog(requestDto).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/blogs']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
