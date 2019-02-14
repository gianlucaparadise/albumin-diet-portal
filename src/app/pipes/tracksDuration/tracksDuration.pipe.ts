import { Pipe, PipeTransform } from '@angular/core';

/*
 * Calculates the duration of a list of spotify tracks
 * and returns a date with the total seconds.
 */
@Pipe({
  name: 'tracksDuration'
})
export class TracksDurationPipe implements PipeTransform {
  transform(tracks: any): Date {
    const trackList: any[] = tracks.items;

    let totalDuration = 0;
    for (const track of trackList) {
      totalDuration += track.duration_ms;
    }
    const date = new Date(0, 0, 0, 0, 0, 0, 0);
    date.setMilliseconds(totalDuration);

    return date;
  }
}
