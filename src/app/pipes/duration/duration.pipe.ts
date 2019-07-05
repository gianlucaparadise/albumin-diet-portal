import { Pipe, PipeTransform } from '@angular/core';

/**
 * Formats a timespan
 */
@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(timespan: Date, args?: any): string {
    console.log(args);

    if (args === 'rough') {
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

    if (args === 'exact') {
      const segments = [];

      const minutes = timespan.getMinutes();
      const minutesPadded = pad(minutes.toString(), 2, '0');
      segments.push(`${minutesPadded}`);

      const seconds = timespan.getSeconds();
      const secondsPadded = pad(seconds.toString(), 2, '0');
      segments.push(`${secondsPadded}`);

      return segments.join(':');
    }

    console.log('Duration Pipe: specify a format');
  }

}

/**
 * Function to pad a string with a filler to a fixed lenght
 * @param n String to pad
 * @param width Lenght of the padded string
 * @param z Filler used to pad
 */
function pad(n: string, width: number, z: string) {
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
