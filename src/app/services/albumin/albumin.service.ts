import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of, BehaviorSubject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../auth/auth.service';
import {
  GetProfileResponse, GetMyTagsResponse, GetMyAlbumsResponse,
  GetAlbumResponse, UserAlbumsResponse, ITag
} from 'albumin-diet-types';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlbuminService {

  private allTags = new BehaviorSubject<ITag[]>([]);

  constructor(private http: HttpClient, private auth: AuthService) { }

  // todo: use a url provider
  private getUrl(endpoint: string): string {
    const engineBaseUrl = environment.engineBaseUrl;
    return engineBaseUrl + endpoint;
  }

  async getProfile(): Promise<GetProfileResponse> {
    try {
      const url = this.getUrl('/api/me/profile');
      const response = <GetProfileResponse>await this.http.get(url, httpOptions).toPromise();
      return response;

    } catch (error) {
      console.error('Error while getting profile: ');
      console.error(error);
    }
  }

  getTags(): BehaviorSubject<ITag[]> {
    this.refreshTags();
    return this.allTags;
  }

  private async refreshTags() {
    try {
      const url = this.getUrl(`/api/me/tag`);

      const response = <GetMyTagsResponse>await this.http.get(url, httpOptions).toPromise();
      this.allTags.next(response.data);
    } catch (error) {
      console.error('Error while refreshing the tag: ');
      console.error(error);
    }
  }

  getAlbums(tags: string[] = null, showUntagged: boolean, offset = 0, limit = 20): Promise<GetMyAlbumsResponse> {
    const params = new URLSearchParams();
    if (tags) {
      params.set('tags', JSON.stringify(tags));
    }
    if (showUntagged) {
      params.set('untagged', 'true');
    }
    if (offset) {
      params.set('offset', offset.toString());
    }
    if (limit) {
      params.set('limit', limit.toString());
    }

    const url = this.getUrl(`/api/me/album?${params}`);

    const token = this.auth.token;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    const result = this.http.get<GetMyAlbumsResponse>(url, httpOptions).toPromise();
    return result;
  }

  getAlbum(spotifyAlbumId: string): Observable<GetAlbumResponse> {
    const url = this.getUrl(`/api/me/album/${spotifyAlbumId}`);

    return this.http.get<GetAlbumResponse>(url, httpOptions);
  }

  async saveAlbum(spotifyAlbumId: string) {
    const url = this.getUrl(`/api/me/album`);

    const requestBody = { album: { spotifyId: spotifyAlbumId } };

    const result = await this.http.put(url, requestBody, httpOptions).toPromise();
    return result;
  }

  async unsaveAlbum(spotifyAlbumId: string) {
    const url = this.getUrl(`/api/me/album`);

    const requestBody = { album: { spotifyId: spotifyAlbumId } };
    httpOptions['body'] = requestBody;

    const result = await this.http.delete(url, httpOptions).toPromise();
    return result;
  }

  async addTagToAlbum(tag: string, albumSpotifyId: string) {
    const url = this.getUrl(`/api/me/tag`);

    const requestBody = { tag: { name: tag }, album: { spotifyId: albumSpotifyId } };

    const result = await this.http.post(url, requestBody, httpOptions).toPromise();
    this.refreshTags();
    return result;
  }

  async deleteTagFromAlbum(tag: any, albumSpotifyId: string) {
    const url = this.getUrl(`/api/me/tag`);

    const requestBody = { tag: { name: tag }, album: { spotifyId: albumSpotifyId } };
    httpOptions['body'] = requestBody;

    const result = await this.http.delete(url, httpOptions).toPromise();
    this.refreshTags();
    return result;
  }

  async getListeningList(offset = 0, limit = 20): Promise<UserAlbumsResponse> {
    const params = new URLSearchParams();
    if (offset) {
      params.set('offset', offset.toString());
    }
    if (limit) {
      params.set('limit', limit.toString());
    }

    const url = this.getUrl(`/api/me/listening-list?${params}`);

    return this.http.get<UserAlbumsResponse>(url, httpOptions).toPromise();
  }

  async addToListeningList(albumSpotifyId: string) {
    const url = this.getUrl(`/api/me/listening-list`);

    const requestBody = { album: { spotifyId: albumSpotifyId } };

    const result = await this.http.post(url, requestBody, httpOptions).toPromise();
    this.refreshTags();
    return result;
  }

  async deleteFromListeningList(albumSpotifyId: string) {
    const url = this.getUrl(`/api/me/listening-list`);

    const requestBody = { album: { spotifyId: albumSpotifyId } };
    httpOptions['body'] = requestBody;

    const result = await this.http.delete(url, httpOptions).toPromise();
    this.refreshTags();
    return result;
  }

  searchAlbums(keywords: string, offset = 0, limit = 20): Promise<UserAlbumsResponse> {
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

    const url = this.getUrl(`/api/me/album/search?${params}`);

    return this.http.get<UserAlbumsResponse>(url, httpOptions).toPromise();
  }

  // searchArtists(keywords: string): Promise<SearchArtistResponse> {
  //   const params = new URLSearchParams();
  //   if (keywords) {
  //     params.set('q', keywords);
  //   }
  //   const url = this.getUrl(`/api/me/artist/search?${params}`);

  //   return this.http.get<SearchArtistResponse>(url, httpOptions).toPromise();
  // }
}
