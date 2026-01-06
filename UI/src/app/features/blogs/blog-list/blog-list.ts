import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogsService } from '../services/blogs-service';

@Component({
  selector: 'app-blog-list',
  imports: [RouterLink],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.css',
})
export class BlogList {
  blogsService = inject(BlogsService);

  getAllBlogsRef = this.blogsService.getAllBlogs();

  isLoading = this.getAllBlogsRef.isLoading;
  error = this.getAllBlogsRef.error;
  response = this.getAllBlogsRef.value;
}
