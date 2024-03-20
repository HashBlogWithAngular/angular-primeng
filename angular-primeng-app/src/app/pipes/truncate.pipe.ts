import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  isNUll: any[] = [undefined, null, ''];

  transform(value: string, maxLength=70): string {
    if (this.isNUll.includes(value))
      return '';
    if (value.length > maxLength)
      return value.substring(0, (maxLength-1)).concat('...');
    return value;
  }

}
