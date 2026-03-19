import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  readonly #sanitizer = inject(DomSanitizer);

  transform(value: string | null | undefined): SafeHtml | null {
    if (!value) return null;

    return this.#sanitizer.bypassSecurityTrustHtml(value);
  }
}
