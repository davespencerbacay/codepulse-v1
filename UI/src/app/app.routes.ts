import { Routes } from '@angular/router';
import { CategoryList } from './features/category/category-list/category-list';
import { AddCategory } from './features/category/add-category/add-category';
import { EditCategory } from './features/category/edit-category/edit-category';
import { BlogList } from './features/blogs/blog-list/blog-list';
import { AddBlog } from './features/blogs/add-blog/add-blog';
import { EditBlog } from './features/blogs/edit-blog/edit-blog';
import { Home } from './features/public/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'admin/categories',
    component: CategoryList,
  },
  {
    path: 'admin/categories/add',
    component: AddCategory,
  },
  {
    path: 'admin/categories/edit/:id',
    component: EditCategory,
  },
  {
    path: 'admin/blogs',
    component: BlogList,
  },
  {
    path: 'admin/blogs/add',
    component: AddBlog,
  },
  {
    path: 'admin/blogs/:id/edit',
    component: EditBlog,
  },
];
