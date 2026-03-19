import { Injectable, inject } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { Category, VisibleCategory } from '@core/models/category.model';
import { CategoryService } from '@core/services/category.webservice';
import { FetchCategoriesData } from '@store/category/category.actions';
import { forkJoin, Observable, of } from 'rxjs';

export interface CategoryStateModel {
  allCategories: Category[];
  visibleCategories: Category[];
  isLoading: boolean;
  error: string | null;
}

@State<CategoryStateModel>({
  name: 'categories',
  defaults: {
    allCategories: [],
    visibleCategories: [],
    isLoading: false,
    error: null,
  },
})
@Injectable()
export class CategoryState {
  private readonly categoryService = inject(CategoryService);

  @Action(FetchCategoriesData)
  fetchAllCategoriesAndGroups(ctx: StateContext<CategoryStateModel>): Observable<{
    all: Category[];
    visible: VisibleCategory[];
  } | null> {
    ctx.patchState({ isLoading: true, error: null });

    return forkJoin({
      all: this.categoryService.getAllCategories(),
      visible: this.categoryService.getVisibleCategories(),
    }).pipe(
      tap(({ all, visible }) => {
        const visibleCategories: Category[] = all.filter((category) =>
          visible.some((vc) => vc.id === category.id),
        );
        ctx.patchState({
          allCategories: all,
          visibleCategories,
          isLoading: false,
        });
      }),
      catchError(() => {
        ctx.patchState({ isLoading: false, error: 'Erreur lors du chargement des catégories' });
        return of(null);
      }),
    );
  }
}
