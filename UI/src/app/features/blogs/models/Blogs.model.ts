import { Category } from '../../category/models/category-model';
export interface AddBlogRequest {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  publishedDate: string;
  author: string;
  isVisible: boolean;
  categories: string[];
}

export interface UpdateBlogRequest {
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  publishedDate: Date;
  author: string;
  isVisible: boolean;
  categories: string[];
}

export interface Blog {
  id: string;
  title: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  urlHandle: string;
  publishedDate: string;
  author: string;
  isVisible: boolean;
  categories: Category[];
}
