import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoryPageService } from '@features/category-page/services/category-page.service';
import { Button } from '@ui/button/button';

@Component({
  selector: 'app-category-footer',
  imports: [Button],
  standalone: true,
  template: `
    <footer class="footer">
      <app-button type="button" (click)="showSelectedCard()">Sélectionner la catégorie</app-button>
    </footer>
  `,
  styles: `
    @use 'variables' as vars;

    :host {
      position: sticky;
      bottom: 0;
      left: 0;
      width: 100%;
      z-index: 100;
    }

    .footer {
      display: flex;
      background-color: white;
      z-index: 10;
      box-shadow: 0 -0.25rem 0.625rem rgba(0, 0, 0, 0.05);
      padding: 1rem;
      justify-content: center;

      @media (min-width: vars.$breakpoint-desktop) {
        padding: 0.7813rem 7.625rem;
        justify-content: flex-end;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFooter {
  readonly #categoryPageService = inject(CategoryPageService);

  showSelectedCard(): void {
    this.#categoryPageService.showSelectedCategory();
  }
}
