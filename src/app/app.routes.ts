import { Routes } from '@angular/router';
import { CategoryPage } from './features/category-page/category-page';

export const routes: Routes = [
  { path: '', redirectTo: 'category/grouped', pathMatch: 'full' },
  { path: 'category', redirectTo: 'category/grouped', pathMatch: 'full' },
  { path: 'category/:sortType', component: CategoryPage },
];
