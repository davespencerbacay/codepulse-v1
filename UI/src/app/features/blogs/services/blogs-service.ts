import { inject, Injectable, InputSignal } from '@angular/core';
import { AddBlogRequest, Blog, UpdateBlogRequest } from '../models/Blogs.model';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
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

  getAllBlogs(): HttpResourceRef<Blog[] | undefined> {
    return httpResource<Blog[]>(() => `${this.apiBaseUrl}/api/blogs`);
  }

  getBlogById(id: InputSignal<string | undefined>): HttpResourceRef<Blog | undefined> {
    return httpResource<Blog>(() => `${this.apiBaseUrl}/api/blogs/${id()}`);
  }

  editBlogById(id: string, body: UpdateBlogRequest): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiBaseUrl}/api/blogs/${id}`, body);
  }
}
