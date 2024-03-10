import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizerHtml',
  standalone: true
})
export class SanitizerHtmlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this.domSanitizer.bypassSecurityTrustHtml(value);
  }
}
