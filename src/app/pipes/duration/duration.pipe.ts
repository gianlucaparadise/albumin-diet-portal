import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats a timespan
 */
@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(timespan: Date, args?: any): string {
    const segments = [];

    const hours = timespan.getHours();
    if (hours > 0) {
      segments.push(`${hours}h`);
    }

    const minutes = timespan.getMinutes();
    if (minutes > 0) {
      segments.push(`${minutes}m`);
    }

    return segments.join(' ');
  }

}
