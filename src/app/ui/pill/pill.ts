import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PillColor } from '@ui/pill/pill-color';

@Component({
  selector: 'app-pill',
  standalone: true,
  template: `
    <p class="pill paragraph-tiny" [class]="'pill__' + color()">
      <ng-content></ng-content>
    </p>
  `,
  styles: `
    .pill {
      display: inline-flex;
      align-items: center;
      padding: 0.125rem 0.75rem;
      border-radius: 1rem;
      width: fit-content;
      height: 1.25rem;

      &__blue {
        background-color: var(--light-blue);
        color: var(--cerulean);
      }

      &__red {
        background-color: var(--light-red);
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
export class Pill {
  readonly color = input<PillColor>('blue');
}
