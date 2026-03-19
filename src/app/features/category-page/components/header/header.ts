import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tab } from '@ui/tab/tab';
import { Icon } from '@ui/icon/icon';

@Component({
  selector: 'app-category-header',
  standalone: true,
  imports: [Tab, Icon],
  template: `
    <header class="header" role="banner">
      <h4>Catégories</h4>
      <nav class="header__nav">
        <ul>
          <li>
            <app-tab [link]="'/category/grouped'">
              <app-icon name="category" />
              Groupe de catégorie
            </app-tab>
          </li>
          <li>
            <app-tab [link]="'/category/alpha'">
              <app-icon name="alphabet" />
              Ordre alphabétique
            </app-tab>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styles: `
    @use 'variables' as vars;

    :host {
      position: sticky;
      top: 0;
      width: 100%;
      z-index: 100;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: white;
      padding: 0.75rem 1rem;
      gap: 0.5rem;

      @media (min-width: vars.$breakpoint-desktop) {
        padding: 0.9375rem 7.625rem;
        justify-content: flex-start;
      }

      li {
        display: inline-block;
      }

      &__nav {
        display: flex;
        align-items: center;
        padding: 0;
        gap: 0.5rem;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryHeader {}
