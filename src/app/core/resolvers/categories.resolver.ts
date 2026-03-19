import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Category } from '@core/models/category.model';
import { Store } from '@ngxs/store';
import { FetchCategoriesData } from '@store/category/category.actions';
import { map } from 'rxjs';

export const categoriesResolver: ResolveFn<{
  categories: Category[];
  visibleCategories: Category[];
}> = () => {
  const store = inject(Store);

  return store.dispatch(new FetchCategoriesData()).pipe(
    map(() => {
      return {
        categories: store.selectSnapshot((state) => state.categories.allCategories),
        visibleCategories: store.selectSnapshot((state) => state.categories.visibleCategories),
        categoryGroups: store.selectSnapshot((state) => state.categories.categoryGroups),
        visibleCategoriesOrderedByGroups: store.selectSnapshot(
          (state) => state.categories.visibleCategoriesOrderedByGroups,
        ),
        visibleCategoriesOrderedByAlphabet: store.selectSnapshot(
          (state) => state.categories.visibleCategoriesOrderedByAlphabet,
        ),
      };
    }),
  );
};
