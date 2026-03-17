import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Header } from '@shared/components/header/header';
import { DropdownComponent, DropdownOption } from '@ui/form/dropdown/dropdown';
import { TextInput } from '@ui/form/text-input/text-input';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [Header, ReactiveFormsModule, DropdownComponent, TextInput],
  template: `
    <app-header></app-header>

    <section class="category-page">
      <form [formGroup]="form" class="category-page__form">
        <app-text-input
          formControlName="search"
          placeholder="Rechercher une catégorie"
          iconName="search"
          class="category-page__form__search"
        ></app-text-input>
        <app-dropdown
          formControlName="dropdown"
          [placeholder]="'Tous les groupes de catégories'"
          [options]="exampleOptions"
          class="category-page__form__dropdown"
        ></app-dropdown>
      </form>
    </section>
  `,
  styles: `
    :host {
      display: block;
      background-color: var(--background-page);
      height: 100%;
    }

    .category-page {
      display: flex;
      margin: 2rem 7.625rem 2.8125rem;
      background-color: white;

      &__form {
        display: flex;
        padding: 1rem 1rem 1.5rem;
        gap: 1rem;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        &__search {
          flex: 1;
          height: 2.1875rem;
        }

        &__dropdown {
          width: 16.9375rem;
          flex-shrink: 0;
          height: 2.1875rem;
        }
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPage {
  sortType = input<string>('grouped');

  readonly exampleOptions: DropdownOption<string>[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  readonly form = new FormGroup({
    search: new FormControl<string>(''),
    dropdown: new FormControl<string>(''),
  });
}
