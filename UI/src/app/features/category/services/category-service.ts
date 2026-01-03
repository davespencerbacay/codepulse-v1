import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { AddCategoryRequest } from '../models/category-model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private apiBaseUrl = 'https://localhost:7139';

  addCategoryStatus = signal<'idle' | 'loading' | 'success' | 'error'>('idle');

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
}
