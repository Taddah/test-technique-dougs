import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button class="btn" (click)="onClick()">
      <ng-content></ng-content>
    </button>
  `,
  styles: `
    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: fit-content;
      height: 2.1875rem;
      padding: 0.4688rem 0.75rem;
      gap: 6px;
      background-color: var(--cerulean);
      border-radius: 4px;
      border: none;
      opacity: 1;
      cursor: pointer;
      font-weight: 700;
      font-size: 0.875rem;
      line-height: 1.2;
      color: white;
      transition: filter 0.2s ease-in-out;
    }

    .btn:hover {
      filter: brightness(0.9);
    }

    .btn:active {
      filter: brightness(0.8);
    }
  `,
})
export class ButtonComponent {
  readonly clicked = output<void>();
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  onClick(): void {
    this.clicked.emit();
  }
}
