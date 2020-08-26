import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'days'
})
export class DaysPipe implements PipeTransform {

  transform(daysCount: number): string {
    return daysCount !== 1 ? daysCount + ' days' : daysCount + ' day';
  }

}
