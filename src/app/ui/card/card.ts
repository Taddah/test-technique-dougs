import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [],
  template: `
    <div class="card" [class.card__selected]="selected()">
      <h6 class="paragraph-semi-bold card__title">{{ title() }}</h6>
      <p class="paragraph-small card__description">{{ description() }}</p>
    </div>
  `,
  styles: `
    .card {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 1rem;
      border: 0.0625rem solid var(--separator);

      &__title {
        color: var(--brand-diante);
      }

      &__description {
        color: var(--grey-barth);
      }

      &__selected {
        border-color: var(--cerulean);
        background-color: var(--light-blue);
      }

      &:hover {
        background-color: #f3f5f8;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card {
  readonly title = input<string>('Card title');
  readonly description = input<string>('Card description');
  readonly selected = input<boolean>(false);
}
