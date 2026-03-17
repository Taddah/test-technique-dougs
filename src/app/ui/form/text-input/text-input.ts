import { ChangeDetectionStrategy, Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '@ui/icon/icon';

@Component({
  selector: 'app-text-input',
  imports: [IconComponent],
  template: `
    <label class="input-text__wrapper" [for]="id">
      @if (iconName(); as icon) {
        <app-icon [name]="icon" class="input-text__icon" aria-hidden="true"></app-icon>
      }
      <input
        type="text"
        [id]="id"
        class="input-text__control paragraph-tiny"
        [placeholder]="placeholder()"
        [value]="value"
        (input)="onInput($event)"
        [disabled]="disabled"
      />
    </label>
  `,
  styles: `
    .input-text {
      &__wrapper {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 0.6563rem 0.5625rem;
        border: 0.0625rem solid var(--separator, #e0e0e0);
        border-radius: 0.25rem;
        background-color: var(--background, #ffffff);
        transition:
          border-color 0.2s ease,
          box-shadow 0.2s ease;
        cursor: text;

        &:focus-within {
          border-color: var(--cerulean);

          .input-text__icon {
            color: var(--cerulean);
          }
        }
      }

      &__icon {
        flex-shrink: 0;
        margin-right: 0.5rem;
        color: var(--text-color, inherit);
        transition: color 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      &__control {
        flex: 1 1 auto;
        width: 100%;
        min-width: 0;
        border: none;
        outline: none;
        background: transparent;
        padding: 0;
      }
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInput),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInput implements ControlValueAccessor {
  readonly iconName = input<string | null>(null);
  readonly placeholder = input<string>('');

  value = '';
  disabled = false;
  readonly id = 'text-input-' + Math.random().toString(9);

  onChange: ((value: string) => void) | undefined;
  onTouched: (() => void) | undefined;

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  writeValue(value: unknown): void {
    this.value = typeof value === 'string' ? value : '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
