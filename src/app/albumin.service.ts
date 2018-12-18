import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tag } from './models/Tag';
import { Album } from './models/Album';

@Injectable({
  providedIn: 'root'
})
export class AlbuminService {

  /**
   * Stub tags
   */
  tags: Tag[] = [
    {
      name: 'Happy'
    },
    {
      name: 'Sad',
    },
    {
      name: 'Concentrate',
    },
    {
      name: 'To be listened',
    },
    {
      name: 'Strong',
    },
    {
      name: 'Singalong',
    },
    {
      name: 'It-pop',
    },
    {
      name: 'Indie2',
    },
    {
      name: 'Best of 2012',
    },
    {
      name: 'Best of 2013',
    },
    {
      name: 'Best of 2014',
    },
    {
      name: 'Best of 2015',
    },
    {
      name: 'Best of 2016',
    },
    {
      name: 'Best of 2019',
    },
    {
      name: 'Best of 2018',
    },
    {
      name: 'Fresh finds',
    },
    {
      name: 'Instrumental',
    },
  ];

  constructor() { }

  getTags(): Observable<Tag[]> {
    return of(this.tags);
  }

  getAlbums() {
    return of(Album.data);
  }
}
