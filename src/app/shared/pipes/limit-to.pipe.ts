import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitTo'
})
export class LimitToPipe implements PipeTransform {

  transform(value: string, limit: number): string {
    return `${value.slice(0, limit)}...`;
  }
}
