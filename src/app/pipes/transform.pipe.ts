import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'transform', pure: false
})
export class TransformPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }
  transform(content) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

}
