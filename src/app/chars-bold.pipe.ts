import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'charsBold',
})
export class CharsBoldPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(text: string, textToBold: string): string | null {
    const regExp = new RegExp('(' + textToBold + ')', 'gi');
    const newText = text.replace(regExp, '<b>$1</b>');
    return this.sanitizer.sanitize(SecurityContext.HTML, newText);
  }
}
