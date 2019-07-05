import { Pipe, PipeTransform } from '@angular/core';

/*
 * Transform a duration in milliseconds in a Timespan
 */
@Pipe({
  name: 'timespan'
})
export class TimespanPipe implements PipeTransform {
  transform(durationMs: number): Date {
    const date = new Date(0, 0, 0, 0, 0, 0, 0);
    date.setMilliseconds(durationMs);

    return date;
  }
}
