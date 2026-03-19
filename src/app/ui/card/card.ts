import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Pill } from '@ui/pill/pill';
import { getPillColor } from '@ui/pill/pill-color';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [Pill],
  template: `
    <div class="card" [class.card__selected]="selected()">
      @let color = computedTagColor();
      @if (tag() && color) {
        <app-pill class="card__pill" [color]="color">{{ tag() }}</app-pill>
      }

      <h6 class="paragraph-semi-bold card__title">{{ title() }}</h6>
      <p class="paragraph-small card__description">{{ description() }}</p>
    </div>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .card {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      padding: 1rem;
      border: 0.0625rem solid var(--separator);
      height: 100%;

      &__pill {
        margin-top: 0.25rem;
      }

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
  readonly tag = input<string | undefined>(undefined);
  readonly tagColor = input<string | undefined>(undefined);

  readonly computedTagColor = computed(() => {
    if (!this.tag()) {
      return undefined;
    }

    return getPillColor(this.tagColor() || '');
  });
}
