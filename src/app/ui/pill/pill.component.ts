import { ChangeDetectionStrategy, Component, input } from '@angular/core';

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
      padding: 2px 12px;
      border-radius: 16px;
      width: fit-content;
      height: 20px;
      box-sizing: border-box;

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
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pill {
  color = input<'blue' | 'red' | 'yellow'>('blue');
}
