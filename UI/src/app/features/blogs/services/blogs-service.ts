import { inject, Injectable } from '@angular/core';
import { AddBlogRequest, Blog } from '../models/Blogs.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  http = inject(HttpClient);
  apiBaseUrl = environment.apiBaseUrl;

  createBlog(data: AddBlogRequest): Observable<Blog> {
    return this.http.post<Blog>(`${this.apiBaseUrl}/api/blogs`, data);
  }
}
