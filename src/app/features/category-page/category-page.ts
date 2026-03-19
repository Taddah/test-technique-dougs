import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoryHeader } from '@features/category-page/components/header/header';
import { Card } from '@ui/card/card';
import { Dropdown, DropdownOption } from '@ui/form/dropdown/dropdown';
import { TextInput } from '@ui/form/text-input/text-input';
import { Subnav } from '@ui/subnav/subnav';
import { debounceTime } from 'rxjs';
import { CategoryPageService } from './services/category-page.service';
import { Category, CategoryGroupWithPillColor } from '@core/models/category.model';
import { NgTemplateOutlet } from '@angular/common';
import { CategoryFooter } from './components/footer/footer';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [
    CategoryHeader,
    CategoryFooter,
    ReactiveFormsModule,
    Dropdown,
    TextInput,
    Card,
    Subnav,
    NgTemplateOutlet,
  ],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPage {
  readonly sortType = input<string>('grouped');

  readonly #categoryPageService = inject(CategoryPageService);
  readonly #route = inject(ActivatedRoute);

  get categoriesAlphabetically(): Category[] {
    return this.#categoryPageService.getCategoriesByAlphabet();
  }

  get categoriesGrouped(): Map<CategoryGroupWithPillColor, Category[]> {
    return this.#categoryPageService.getCategoriesGrouped();
  }

  get dropdownOptions(): DropdownOption<string>[] {
    return this.#categoryPageService.dropdownOptions();
  }

  get isLoading(): boolean {
    return this.#categoryPageService.isLoading();
  }

  get error(): string | null {
    return this.#categoryPageService.error();
  }

  get selectedCategoryId(): number | null {
    return this.#categoryPageService.selectedCategoryId();
  }

  readonly skeletonArray = Array.from({ length: 6 }, (_, i) => i);

  readonly form = new FormGroup({
    search: new FormControl<string>(''),
    dropdown: new FormControl<string>(''),
  });

  constructor() {
    this.#route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.form.patchValue(
        {
          search: params.get('search') || '',
          dropdown: params.get('group') || '',
        },
        { emitEvent: false },
      );
    });

    this.form.valueChanges.pipe(takeUntilDestroyed(), debounceTime(300)).subscribe((value) => {
      this.#categoryPageService.addFiltersToQueryParams(
        value.search ?? null,
        value.dropdown ? Number(value.dropdown) : null,
      );
    });
  }

  selectCard(id: number): void {
    this.#categoryPageService.selectedCategoryId.set(id);
  }
}
