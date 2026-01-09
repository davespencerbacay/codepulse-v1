import { Component, effect, inject, input } from '@angular/core';
import { BlogsService } from '../services/blogs-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';
import { UpdateBlogRequest } from '../models/Blogs.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-blog',
  imports: [ReactiveFormsModule, MarkdownComponent],
  templateUrl: './edit-blog.html',
  styleUrl: './edit-blog.css',
})
export class EditBlog {
  id = input<string>();
  blogService = inject(BlogsService);
  categoryService = inject(CategoryService);
  router = inject(Router);

  private blogRef = this.blogService.getBlogById(this.id);
  blogResponse = this.blogRef.value;

  private categoriesRef = this.categoryService.getAllCategories();
  categoriesResponse = this.categoriesRef.value;

  editBlogPostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(1000)],
    }),
    shortDescription: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(1300)],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(15000)],
    }),
    featuredImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(100)],
    }),
    publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(4), Validators.maxLength(50)],
    }),
    isVisible: new FormControl<boolean>(true, {
      nonNullable: true,
    }),
    categories: new FormControl<string[]>([], {
      nonNullable: true,
    }),
  });

  effectRef = effect(() => {
    if (this.blogResponse()) {
      this.editBlogPostForm.patchValue({
        title: this.blogResponse()?.title,
        shortDescription: this.blogResponse()?.shortDescription,
        content: this.blogResponse()?.content,
        featuredImageUrl: this.blogResponse()?.featuredImageUrl,
        urlHandle: this.blogResponse()?.urlHandle,
        publishedDate: new Date(this.blogResponse()?.publishedDate!).toISOString().split('T')[0],
        author: this.blogResponse()?.author,
        isVisible: this.blogResponse()?.isVisible ?? true,
        categories: this.blogResponse()?.categories.map((cat) => cat.id) ?? [],
      });
    }
  });

  onSubmit() {
    const id = this.id();
    console.log(this.editBlogPostForm.valid);
    if (id && this.editBlogPostForm.valid) {
      const formValue = this.editBlogPostForm.getRawValue();
      const updateBlogRequest: UpdateBlogRequest = {
        title: formValue.title,
        shortDescription: formValue.shortDescription,
        content: formValue.content,
        featuredImageUrl: formValue.featuredImageUrl,
        urlHandle: formValue.urlHandle,
        publishedDate: new Date(formValue.publishedDate),
        categories: formValue.categories ?? [],
        author: formValue.author,
        isVisible: formValue.isVisible,
      };

      this.blogService.editBlogById(id, updateBlogRequest).subscribe({
        next: () => {
          this.router.navigate(['/admin/blogs']);
        },
        error: (err) => {
          console.error('Error updating blog:', err);
        },
      });
    }
  }
}
