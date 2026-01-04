import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable, InputSignal, signal } from '@angular/core';
import { AddCategoryRequest, Category, UpdateCategoryRequest } from '../models/category-model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  addCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');
  editCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

  addCategory(category: AddCategoryRequest) {
    this.addCategoryStatus.set('loading');
    this.http.post<void>(`${this.apiBaseUrl}/api/category`, category).subscribe({
      next: () => {
        this.addCategoryStatus.set('success');
      },
      error: (error) => {
        this.addCategoryStatus.set('error');
        console.log(error);
      },
    });
  }

  getAllCategories() {
    return httpResource<Category[]>(() => `${this.apiBaseUrl}/api/category`);
  }

  getCategoryById(id: InputSignal<string | undefined>) {
    return httpResource<Category>(() => `${this.apiBaseUrl}/api/category/${id()}`);
  }

  updateCategory(id: string, category: UpdateCategoryRequest) {
    this.editCategoryStatus.set('loading');
    this.http.put<void>(`${this.apiBaseUrl}/api/category/${id}`, category).subscribe({
      next: () => {
        this.editCategoryStatus.set('success');
      },
      error: (error) => {
        this.editCategoryStatus.set('error');
        console.log(error);
      },
    });
  }
}
