import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <div
      class="icon-mask"
      [style.mask-image]="iconUrl()"
      [style.-webkit-mask-image]="iconUrl()"
    ></div>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .icon-mask {
      width: 1em;
      height: 1em;
      background-color: currentColor;
      mask-size: contain;
      mask-position: center;
      mask-repeat: no-repeat;
    }
  `,
})
export class IconComponent {
  name = input.required<string>();
  iconUrl = computed(() => `url(assets/icons/${this.name()}.svg)`);
}
