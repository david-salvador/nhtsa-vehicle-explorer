import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: false
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string, searchTerm: string): SafeHtml {
    if (!searchTerm || !value) {
      return value;
    }

    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const highlightedValue = value.replace(regex, '<mark>$1</mark>');
    return this.sanitizer.sanitize(1, highlightedValue) || value;
  }

}
