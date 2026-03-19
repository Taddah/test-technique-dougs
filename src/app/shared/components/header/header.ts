import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tab } from '@ui/tab/tab';
import { IconComponent } from '@ui/icon/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [Tab, IconComponent],
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
    .header {
      position: sticky;
      display: flex;
      padding: 0.9375rem 7.625rem;
      gap: 0.5rem;
      background-color: white;
      top: 0;
      width: 100%;

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
export class Header {}
