import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';

import { AuthService } from './auth.service';
import { Tag } from './models/Tag';
import { Album } from './models/Album';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlbuminService {
  // todo: use a url provider
  // todo: share models between backend and frontend

  /**
   * Stub tags
   */
  // tslint:disable-next-line:max-line-length
  // tags: Tag[] = [{ name: 'Happy' }, { name: 'Sad' }, { name: 'Concentrate' }, { name: 'To be listened' }, { name: 'Strong' }, { name: 'Singalong' }, { name: 'It-pop' }, { name: 'Indie2' }, { name: 'Best of 2012' }, { name: 'Best of 2013' }, { name: 'Best of 2014' }, { name: 'Best of 2015' }, { name: 'Best of 2016' }, { name: 'Best of 2019' }, { name: 'Best of 2018' }, { name: 'Fresh finds' }, { name: 'Instrumental' }];

  private allTags = new BehaviorSubject([]);

  constructor(private http: HttpClient, private auth: AuthService) { }

  // getTags(): Observable<Tag[]> {
  //   return of(this.tags);
  // }

  getTags(): BehaviorSubject<any[]> {
    this.refreshTags();
    return this.allTags;
  }

  private async refreshTags() {
    try {
      const url = `http://localhost:3000/api/me/tag`;

      const response: any = await this.http.get(url, httpOptions).toPromise();
      this.allTags.next(response.data);
    } catch (error) {
      console.error('Error while refreshing the tag: ');
      console.error(error);
    }
  }

  // getAlbums() {
  //   return of(Album.data);
  // }

  getAlbums(tags: string[] = null, offset = 0, limit = 20): Promise<any> {
    const params = new URLSearchParams();
    if (tags) {
      params.set('tags', JSON.stringify(tags));
    }
    if (offset) {
      params.set('offset', offset.toString());
    }
    if (limit) {
      params.set('limit', limit.toString());
    }

    const url = `http://localhost:3000/api/me/album?${params}`;

    const token = this.auth.token;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    const result = this.http.get(url, httpOptions).toPromise();
    return result;
  }

  getAlbum(spotifyAlbumId: string): Observable<any> {
    const url = `http://localhost:3000/api/me/album/${spotifyAlbumId}`;

    return this.http.get(url, httpOptions);
  }

  async addTagToAlbum(tag: string, albumSpotifyId: string) {
    const url = `http://localhost:3000/api/me/tag`;

    const requestBody = { tag: { name: tag }, album: { spotifyId: albumSpotifyId } };

    const result = await this.http.post(url, requestBody, httpOptions).toPromise();
    this.refreshTags();
    return result;
  }

  async deleteTagFromAlbum(tag: any, albumSpotifyId: string) {
    const url = `http://localhost:3000/api/me/tag`;

    const requestBody = { tag: { name: tag }, album: { spotifyId: albumSpotifyId } };
    httpOptions['body'] = requestBody;

    const result = await this.http.delete(url, httpOptions).toPromise();
    this.refreshTags();
    return result;
  }

  async getListeningList(offset = 0, limit = 20): Promise<any> {
    const params = new URLSearchParams();
    if (offset) {
      params.set('offset', offset.toString());
    }
    if (limit) {
      params.set('limit', limit.toString());
    }

    const url = `http://localhost:3000/api/me/listening-list?${params}`;

    return this.http.get(url, httpOptions).toPromise();
  }

  async addToListeningList(albumSpotifyId: string) {
    const url = `http://localhost:3000/api/me/listening-list`;

    const requestBody = { album: { spotifyId: albumSpotifyId } };

    const result = await this.http.post(url, requestBody, httpOptions).toPromise();
    this.refreshTags();
    return result;
  }

  async deleteFromListeningList(albumSpotifyId: string) {
    const url = `http://localhost:3000/api/me/listening-list`;

    const requestBody = { album: { spotifyId: albumSpotifyId } };
    httpOptions['body'] = requestBody;

    const result = await this.http.delete(url, httpOptions).toPromise();
    this.refreshTags();
    return result;
  }

  searchAlbums(keywords: string, offset = 0, limit = 20): Promise<any> {
    const params = new URLSearchParams();
    if (keywords) {
      params.set('q', keywords);
    }
    if (offset) {
      params.set('offset', offset.toString());
    }
    if (limit) {
      params.set('limit', limit.toString());
    }

    const url = `http://localhost:3000/api/me/album/search?${params}`;

    return this.http.get(url, httpOptions).toPromise();
  }

  searchArtists(keywords: string): Promise<any> {
    const params = new URLSearchParams();
    if (keywords) {
      params.set('q', keywords);
    }
    const url = `http://localhost:3000/api/me/artist/search?${params}`;

    return this.http.get(url, httpOptions).toPromise();
  }
}
