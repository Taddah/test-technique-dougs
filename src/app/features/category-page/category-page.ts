import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Header } from '@shared/components/header/header';

@Component({
  selector: 'app-category-page',
  standalone: true,
  imports: [Header],
  template: `
    <app-header></app-header>
    <p>Type de tri: {{ sortType() }}</p>
  `,
  styles: `
    :host {
      display: block;
      background-color: var(--background-page);
      height: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPage {
  sortType = input<string>('grouped');
}
