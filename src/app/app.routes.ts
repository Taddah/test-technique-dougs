import { Routes } from '@angular/router';
import { CategoryPage } from './features/category-page/category-page';
import { categoriesResolver } from '@core/resolvers/categories.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'category/grouped', pathMatch: 'full' },
  { path: 'category', redirectTo: 'category/grouped', pathMatch: 'full' },
  {
    path: 'category/:sortType',
    component: CategoryPage,
    resolve: {
      categoriesResolver,
    },
  },
];
