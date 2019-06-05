import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
  AlbumDetailLoad,
  AlbumDetailActionTypes,
  AlbumDetailLoadSuccess,
  AlbumDetailError,
  AlbumDetailLoadProps,
  AlbumDetailLoadFromRemote,
} from '../actions/album-detail.action';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { AlbuminService } from 'src/app/services/albumin/albumin.service';
import { of } from 'rxjs';
import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { TaggedAlbum } from 'albumin-diet-types';

@Injectable()
export class AlbumDetailEffects {

  @Effect()
  loadAlbum$ = this.actions$
    .pipe(
      ofType<AlbumDetailLoad>(AlbumDetailActionTypes.Load),
      withLatestFrom(this.store$),
      mergeMap(([action, state]) => {
        // First I check from cached responses
        const result = searchForAlbumDescriptor(state, action.payload);

        // In any case, I call the dedicated API just to be sure
        this.store$.dispatch(new AlbumDetailLoadFromRemote(action.payload));

        return of(new AlbumDetailLoadSuccess({
          albumDescriptor: result
        }));
      })
    );

  @Effect()
  loadAlbumFromRemote$ = this.actions$
    .pipe(
      ofType<AlbumDetailLoadFromRemote>(AlbumDetailActionTypes.Load),
      mergeMap((action) => this.albuminService.getAlbum(action.payload.albumId)
        .pipe(
          map(response => response.data),
          map(result => (new AlbumDetailLoadSuccess({
            albumDescriptor: result
          }))),
          catchError((err) => of(new AlbumDetailError({ err })))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private albuminService: AlbuminService
  ) { }
}

function searchForAlbumDescriptor(state: AppState, props: AlbumDetailLoadProps) {
  // TODO: this search should be performed depending on origin
  const query = (a: TaggedAlbum) => a.album.id === props.albumId;
  let albumDescriptor: TaggedAlbum;

  const myAlbums = state.myAlbumsFeature.albumDescriptors;
  albumDescriptor = myAlbums ? myAlbums.find(query) : null;
  if (albumDescriptor) {
    return albumDescriptor;
  }

  const listeningListAlbums = state.listeningListFeature.albumDescriptors;
  albumDescriptor = listeningListAlbums ? <TaggedAlbum>listeningListAlbums.find(query) : null;
  if (albumDescriptor) {
    return albumDescriptor;
  }

  const searchAlbums = state.searchFeature.albumDescriptors;
  albumDescriptor = searchAlbums ? <TaggedAlbum>searchAlbums.find(query) : null;
  if (albumDescriptor) {
    return albumDescriptor;
  }

  return null;
}
