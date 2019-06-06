import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
  ListeningListLoad,
  ListeningListActionTypes,
  ListeningListLoadSuccess,
  ListeningListError,
  ListeningListLoadNext,
  ListeningListLoadNextSuccess,
  ListeningListRemove,
  ListeningListAdd
} from '../actions/listening-list.action';
import { mergeMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { AlbuminService } from 'src/app/services/albumin/albumin.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { selectors } from '../selectors';

@Injectable()
export class ListeningListEffects {

  @Effect()
  loadAlbums$ = this.actions$
    .pipe(
      ofType<ListeningListLoad>(ListeningListActionTypes.Load),
      mergeMap((action) => (this.albuminService.getListeningList())
        .pipe(
          map(response => response.data),
          map(result => (new ListeningListLoadSuccess({
            albumDescriptors: result
          }))),
          catchError((err) => of(new ListeningListError({ err })))
        )
      )
    );

  @Effect()
  loadAlbumsNext$ = this.actions$
    .pipe(
      ofType<ListeningListLoadNext>(ListeningListActionTypes.LoadNext),
      withLatestFrom(this.store$.select(selectors.listeningListFeature)),
      mergeMap(([action, listeningList]) => (
        this.albuminService.getListeningList(
          listeningList.albumDescriptors.length
        )
      )
        .pipe(
          map(response => response.data),
          map(result => (new ListeningListLoadNextSuccess({
            albumDescriptors: result
          }))),
          catchError((err) => of(new ListeningListError({ err })))
        )
      )
    );

  @Effect()
  addAlbum$ = this.actions$
    .pipe(
      ofType<ListeningListAdd>(ListeningListActionTypes.Add),
      withLatestFrom(this.store$.select(selectors.listeningListAlbumDescriptors)),
      filter(([action, listeningList]) => !!listeningList),
      mergeMap(([action, listeningList]) => {
        listeningList.push(action.payload.albumDescriptor);
        return of(new ListeningListLoadSuccess({
          albumDescriptors: listeningList
        }));
      })
    );

  @Effect()
  removeAlbum$ = this.actions$
    .pipe(
      ofType<ListeningListRemove>(ListeningListActionTypes.Remove),
      withLatestFrom(this.store$.select(selectors.listeningListAlbumDescriptors)),
      filter(([action, listeningList]) => !!listeningList),
      mergeMap(([action, listeningList]) => {
        const index = listeningList.findIndex(a => a.album.id === action.payload.albumId);
        const removed = listeningList.splice(index, 1);
        return of(new ListeningListLoadSuccess({
          albumDescriptors: listeningList
        }));
      })
    );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private albuminService: AlbuminService
  ) { }
}
