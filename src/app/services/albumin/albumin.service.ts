import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { UrlFactoryService } from '../url-factory/url-factory.service';
import { AuthService } from '../auth/auth.service';
import {
  GetProfileResponse, GetMyTagsResponse, GetMyAlbumsResponse,
  GetAlbumResponse, UserAlbumsResponse, TaggedAlbum, EmptyResponse
} from 'albumin-diet-types';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { TagsLoad } from 'src/app/store/actions/tag.actions';
import { ListeningListRemove, ListeningListAdd } from 'src/app/store/actions/listening-list.action';
import { MyAlbumsRemove } from 'src/app/store/actions/my-albums.action';
import { environment } from 'src/environments/environment';

console.log(`USE_STUB: ${environment.useStub}`);
const isInStub = environment.useStub === true; // TODO: use a real mocking system

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AlbuminService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private urlFactory: UrlFactoryService,
    private store: Store<AppState>
  ) { }

  async getProfile(): Promise<GetProfileResponse> {
    if (isInStub) {
      const response = this.http.get<GetProfileResponse>('../../../assets/mocks/getProfile.json').toPromise();
      return response;
    }

    try {
      const url = this.urlFactory.getUrl('profile');
      const response = <GetProfileResponse>await this.http.get(url, httpOptions).toPromise();
      return response;

    } catch (error) {
      console.error('Error while getting profile: ');
      console.error(error);
    }
  }

  private refreshTags() {
    this.store.dispatch(new TagsLoad());
  }

  public getTags(): Observable<GetMyTagsResponse> {
      if (isInStub) {
        const response = this.http.get<GetMyTagsResponse>('../../../assets/mocks/getTags.json');
        return response;
      }

      const url = this.urlFactory.getUrl(`tag`);
      return this.http.get<GetMyTagsResponse>(url, httpOptions);
  }

  getAlbums(tags: string[] = null, showUntagged: boolean, offset = 0, limit = 20): Observable<GetMyAlbumsResponse> {
    if (isInStub) {
      const response = this.http.get<GetMyAlbumsResponse>('../../../assets/mocks/getAlbums.json');
      return response;
    }

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

    const url = this.urlFactory.getUrl('albums', params);

    const token = this.auth.token;
    httpOptions.headers = httpOptions.headers.set('Authorization', `Bearer ${token}`);
    const result = this.http.get<GetMyAlbumsResponse>(url, httpOptions);
    return result;
  }

  getAlbum(spotifyAlbumId: string): Observable<GetAlbumResponse> {
    if (isInStub) {
      const response = this.http.get<GetAlbumResponse>('../../../assets/mocks/getAlbum.json');
      return response;
    }

    const url = this.urlFactory.getUrl('album', spotifyAlbumId);

    return this.http.get<GetAlbumResponse>(url, httpOptions);
  }

  async saveAlbum(spotifyAlbumId: string) {
    if (isInStub) {
      const response = this.http.get<GetAlbumResponse>('../../../assets/mocks/getAlbum.json').toPromise();
      return response;
    }

    const url = this.urlFactory.getUrl(`album`);

    const requestBody = { album: { spotifyId: spotifyAlbumId } };

    const result = await this.http.put(url, requestBody, httpOptions).toPromise();
    return result;
  }

  async unsaveAlbum(spotifyAlbumId: string) {
    if (isInStub) {
      const response = this.http.get<EmptyResponse>('../../../assets/mocks/empty.json').toPromise();
      return response;
    }

    const url = this.urlFactory.getUrl(`album`);

    const requestBody = { album: { spotifyId: spotifyAlbumId } };
    httpOptions['body'] = requestBody;

    const result = await this.http.delete(url, httpOptions).toPromise();
    this.store.dispatch(new MyAlbumsRemove({ albumId: spotifyAlbumId }));
    return result;
  }

  async addTagToAlbum(tag: string, albumSpotifyId: string) {
    if (isInStub) {
      const response = this.http.get<EmptyResponse>('../../../assets/mocks/empty.json').toPromise();
      return response;
    }

    const url = this.urlFactory.getUrl(`tag`);

    const requestBody = { tag: { name: tag }, album: { spotifyId: albumSpotifyId } };

    const result = await this.http.post(url, requestBody, httpOptions).toPromise();
    this.refreshTags();
    return result;
  }

  async deleteTagFromAlbum(tag: any, albumSpotifyId: string) {
    if (isInStub) {
      const response = this.http.get<EmptyResponse>('../../../assets/mocks/empty.json').toPromise();
      return response;
    }

    const url = this.urlFactory.getUrl(`tag`);

    const requestBody = { tag: { name: tag }, album: { spotifyId: albumSpotifyId } };
    httpOptions['body'] = requestBody;

    const result = await this.http.delete(url, httpOptions).toPromise();
    this.refreshTags();
    return result;
  }

  getListeningList(offset = 0, limit = 20): Observable<UserAlbumsResponse> {
    if (isInStub) {
      const response = this.http.get<UserAlbumsResponse>('../../../assets/mocks/getListeningList.json');
      return response;
    }

    const params = new URLSearchParams();
    if (offset) {
      params.set('offset', offset.toString());
    }
    if (limit) {
      params.set('limit', limit.toString());
    }

    const url = this.urlFactory.getUrl('listening-list', params);

    return this.http.get<UserAlbumsResponse>(url, httpOptions);
  }

  async addToListeningList(albumDescriptor: TaggedAlbum) {
    if (isInStub) {
      const response = this.http.get<EmptyResponse>('../../../assets/mocks/empty.json').toPromise();
      return response;
    }

    const url = this.urlFactory.getUrl(`listening-list`);

    const requestBody = { album: { spotifyId: albumDescriptor.album.id } };

    const result = await this.http.post(url, requestBody, httpOptions).toPromise();
    this.store.dispatch(new ListeningListAdd({ albumDescriptor }));
    return result;
  }

  async deleteFromListeningList(albumSpotifyId: string) {
    if (isInStub) {
      const response = this.http.get<EmptyResponse>('../../../assets/mocks/empty.json').toPromise();
      return response;
    }

    const url = this.urlFactory.getUrl(`listening-list`);

    const requestBody = { album: { spotifyId: albumSpotifyId } };
    httpOptions['body'] = requestBody;

    const result = await this.http.delete(url, httpOptions).toPromise();
    this.store.dispatch(new ListeningListRemove({ albumId: albumSpotifyId }));
    return result;
  }

  searchAlbums(keywords: string, offset = 0, limit = 20): Observable<UserAlbumsResponse> {
    if (isInStub) {
      const response = this.http.get<UserAlbumsResponse>('../../../assets/mocks/search.json');
      return response;
    }

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

    const url = this.urlFactory.getUrl('search', params);

    return this.http.get<UserAlbumsResponse>(url, httpOptions);
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
