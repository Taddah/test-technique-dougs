import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  forwardRef,
  HostListener,
  input,
  model,
  signal,
  inject,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IconComponent } from '@ui/icon/icon';

export interface DropdownOption<T = string> {
  value: T;
  label: string;
}

@Component({
  selector: 'app-dropdown',
  imports: [IconComponent],
  template: `
    <div
      class="dropdown__wrapper"
      [class.dropdown__wrapper--disabled]="disabled()"
      [class.dropdown__wrapper--opened]="isOpen()"
      (click)="toggleDropdown()"
    >
      <div class="dropdown__control paragraph-tiny">
        {{ selectedOption()?.label || placeholder() }}
      </div>
      <app-icon name="arrow" class="dropdown__icon" aria-hidden="true"></app-icon>
      @if (isOpen()) {
        <ul class="dropdown__options-list">
          @for (option of options(); track option.value) {
            <li
              class="dropdown__option paragraph-tiny"
              [class.dropdown__option--selected]="value() === option.value"
              (click)="selectOption(option)"
            >
              {{ option.label }}
            </li>
          }
        </ul>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
      position: relative;
    }

    .dropdown {
      &__wrapper {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        border: 0.0625rem solid var(--separator, #e0e0e0);
        border-radius: 0.25rem;
        background-color: var(--background, #ffffff);
        transition:
          border-color 0.2s ease,
          box-shadow 0.2s ease;
        cursor: pointer;

        &--disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        &--opened {
          border-color: var(--cerulean);

          .dropdown__icon {
            color: var(--cerulean);
            transform: rotate(180deg);
          }
        }
      }

      &__icon {
        flex-shrink: 0;
        color: var(--text-color, inherit);
        transition:
          transform 0.2s ease,
          color 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 0.5625rem 0 0;
      }

      &__control {
        flex: 1 1 auto;
        width: 100%;
        min-width: 0;
        border: none;
        outline: none;
        background: transparent;
        padding: 0.5938rem 0 0.5938rem 0.5625rem;
      }

      &__options-list {
        position: absolute;
        top: calc(100% + 0.25rem);
        left: 0;
        right: 0;
        background-color: var(--background, #ffffff);
        border: 1px solid var(--separator);
        border-radius: 0.25rem;
        list-style: none;
        padding: 0.25rem 0;
        margin: 0;
        z-index: 10;
        max-height: 12.5rem;
        overflow-y: auto;
      }

      &__option {
        padding: 0.5rem 0.75rem;
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
          background-color: #f5f5f5;
          font-weight: 500;
        }

        &--selected {
          color: var(--cerulean);
          font-weight: 600;

          &:hover {
            font-weight: 600;
          }
        }
      }
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent<T> implements ControlValueAccessor {
  private readonly elementRef = inject(ElementRef);

  readonly placeholder = input<string>('');
  readonly options = input<DropdownOption<T>[]>([]);
  readonly ariaLabel = input<string>();
  readonly disabled = model<boolean>(false);

  readonly value = signal<T | null | undefined>(undefined);
  readonly isOpen = signal(false);

  readonly selectedOption = computed(() => this.options().find((o) => o.value === this.value()));

  readonly id = 'dropdown-' + Math.random().toString(9);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: T) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.isOpen() && !this.elementRef.nativeElement.contains(event.target as Node)) {
      this.isOpen.set(false);
    }
  }

  toggleDropdown(): void {
    if (!this.disabled()) {
      this.isOpen.set(!this.isOpen());
    }
  }

  selectOption(option: DropdownOption<T>): void {
    this.value.set(option.value);
    this.onChange(option.value);
    this.isOpen.set(false);
  }

  writeValue(val: T): void {
    this.value.set(val);
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
