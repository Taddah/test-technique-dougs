import { Selector } from '@ngxs/store';
import { Category, CategoryGroup } from '@core/models/category.model';
import { CategoryState, CategoryStateModel } from '@store/category/category.state';

export class CategorySelectors {
  @Selector([CategoryState])
  static isLoading(state: CategoryStateModel): boolean {
    return state.isLoading;
  }

  @Selector([CategoryState])
  static allCategories(state: CategoryStateModel): Category[] {
    return state.allCategories;
  }

  @Selector([CategoryState])
  static visibleCategories(state: CategoryStateModel): Category[] {
    return state.visibleCategories;
  }

  @Selector([CategoryState])
  static error(state: CategoryStateModel): string | null {
    return state.error;
  }

  @Selector([CategoryState])
  static categoryGroups(state: CategoryStateModel): CategoryGroup[] {
    if (!state || !state.visibleCategories) {
      return [];
    }

    const groupsMap: Record<number, CategoryGroup> = {};

    state.visibleCategories.forEach((category) => {
      if (category.group) {
        if (!groupsMap[category.group.id]) {
          groupsMap[category.group.id] = { ...category.group };
        }
      }
    });

    return Object.values(groupsMap);
  }
}
