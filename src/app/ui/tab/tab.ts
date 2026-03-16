import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tab',
  imports: [RouterLink, RouterLinkActive],
  standalone: true,
  template: `
    <a class="tab tab-text" [routerLink]="[link()]" routerLinkActive="tab__active">
      <ng-content></ng-content>
    </a>
  `,
  styles: `
    .tab {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      color: black;
      text-decoration: none;

      &:focus {
        cursor: pointer;
      }

      &__active {
        color: var(--cerulean) !important;
        background-color: var(--light-blue);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab {
  readonly link = input<string>('');
}
