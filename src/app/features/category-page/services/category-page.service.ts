import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CategoryGroup, CategoryGroupWithPillColor } from '@core/models/category.model';
import { Store } from '@ngxs/store';
import { CategorySelectors } from '@store/category/category.selectors';
import { DropdownOption } from '@ui/form/dropdown/dropdown';
import { getPillColor } from '@ui/pill/pill-color';
import { map } from 'rxjs';

interface CategoryQueryParams {
  search: string | null;
  group: number | null;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryPageService {
  readonly #store = inject(Store);
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);

  readonly #categories: Signal<Category[]> = this.#store.selectSignal(
    CategorySelectors.visibleCategories,
  );
  readonly #categoriesGroup: Signal<CategoryGroup[]> = this.#store.selectSignal(
    CategorySelectors.categoryGroups,
  );
  readonly isLoading = this.#store.selectSignal(CategorySelectors.isLoading);
  readonly error = this.#store.selectSignal(CategorySelectors.error);

  readonly #queryParams = toSignal(
    this.#route.queryParamMap.pipe(
      map((params) => {
        return {
          search: params.get('search'),
          group: params.get('group') ? Number(params.get('group')) : null,
        };
      }),
    ),
  );

  public addFiltersToQueryParams(search: string | null | undefined, group: number | null): void {
    this.#router.navigate([], {
      relativeTo: this.#route,
      queryParams: {
        search,
        group,
      },
      queryParamsHandling: 'merge',
    });
  }

  public getCategoriesByAlphabet = computed(() => {
    const categories: Category[] = this.#categories();
    const queryParams = this.#queryParams();

    const sortedCategories = [...categories].sort((a, b) => a.wording.localeCompare(b.wording));

    return this.#filterCategoriesByQueryParams(sortedCategories, queryParams);
  });

  public getCategoriesGrouped = computed(() => {
    const categories: Category[] = this.#categories();
    const queryParams = this.#queryParams();
    const categoriesByGroup = new Map<CategoryGroupWithPillColor, Category[]>();

    const filteredCategories = this.#filterCategoriesByQueryParams(categories, queryParams);

    filteredCategories.forEach((category: Category) => {
      const currentGroupId = category.group?.id ?? 0;
      let groupKey = Array.from(categoriesByGroup.keys()).find((k) => k.id === currentGroupId);

      if (!groupKey) {
        groupKey = category.group
          ? { ...category.group, pillColor: getPillColor(category.group.color) }
          : { id: 0, name: 'Sans groupe', color: '', pillColor: getPillColor('') };

        categoriesByGroup.set(groupKey, []);
      }

      categoriesByGroup.get(groupKey)!.push(category);
    });

    return categoriesByGroup;
  });

  public dropdownOptions: Signal<DropdownOption[]> = computed(() => {
    const categoriesGroup = this.#categoriesGroup();
    if (!categoriesGroup) return [];

    const options = categoriesGroup
      .map((group: CategoryGroup) => {
        return {
          value: group.id.toString(),
          label: group.name,
        } as DropdownOption;
      })
      .sort((a: DropdownOption, b: DropdownOption) => a.label.localeCompare(b.label));

    options.unshift({ value: '', label: 'Tous les groupes de catégories' } as DropdownOption);
    return options;
  });

  readonly selectedCategoryId = signal<number | null>(null);

  public showSelectedCategory(): void {
    if (!this.selectedCategoryId()) {
      console.log('Pas de catégorie sélectionnée');
      return;
    }

    const selectedCategory = this.#categories().find(
      (category) => category.id === this.selectedCategoryId(),
    );

    if (!selectedCategory) {
      console.log('Catégorie sélectionnée introuvable');
    }

    alert('Catégorie sélectionnée : ' + selectedCategory?.wording);
    console.log('Catégorie sélectionnée :', selectedCategory);
  }

  #filterCategoriesByQueryParams(
    categories: Category[],
    queryParams: CategoryQueryParams | undefined,
  ): Category[] {
    if (!queryParams) return categories;
    let filteredCategories = categories;

    if (queryParams.group) {
      filteredCategories = this.#filterCategoriesByGroup(filteredCategories, queryParams.group);
    }

    if (queryParams.search) {
      filteredCategories = this.#filterCategoriesBySearch(filteredCategories, queryParams.search);
    }

    return filteredCategories;
  }

  #filterCategoriesByGroup(categories: Category[], groupId: number): Category[] {
    return categories.filter((category) => category.group?.id === groupId);
  }

  #filterCategoriesBySearch(categories: Category[], search: string): Category[] {
    if (!search || search.trim() === '') return categories;

    const searchTerms = search.toLowerCase().trim().split(/\s+/);

    return categories.filter((category) => {
      const wordingWords = category.wording
        .toLocaleLowerCase()
        .trim()
        .split(/[\s-']/);
      return searchTerms.every((searchTerm) => {
        return wordingWords.some((word) => word.startsWith(searchTerm));
      });
    });
  }
}
