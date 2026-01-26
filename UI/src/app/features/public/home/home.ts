import { Component, inject } from '@angular/core';
import { BlogsService } from '../../blogs/services/blogs-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  blogService = inject(BlogsService);
  blogPostsRef = this.blogService.getAllBlogs();
  isLoading = this.blogPostsRef.isLoading;
  blogsResponse = this.blogPostsRef.value;
}
