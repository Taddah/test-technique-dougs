import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PillColor } from '@ui/pill/pill-color';

@Component({
  selector: 'app-subnav',
  standalone: true,
  template: `
    <p class="subnav paragraph-tiny" [class]="'subnav__' + color()">
      <ng-content></ng-content>
    </p>
  `,
  styles: `
    .subnav {
      display: inline-flex;
      align-items: center;
      padding: 0.125rem 1rem;
      width: 100%;
      height: 1.25rem;

      &__blue {
        background-color: #e0f6fe;
        color: var(--cerulean);
      }

      &__red {
        background-color: #ffece6;
        color: var(--bittersweet);
      }

      &__yellow {
        background-color: var(--light-yellow);
        color: var(--yellow);
      }

      &__purple {
        background-color: var(--light-purple);
        color: var(--purple);
      }

      &__pink {
        background-color: var(--light-pink);
        color: var(--pink);
      }

      &__green {
        background-color: var(--light-green);
        color: var(--green);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Subnav {
  readonly color = input<PillColor>('blue');
}
