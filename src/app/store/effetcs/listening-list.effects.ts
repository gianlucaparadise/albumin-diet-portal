import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
  ListeningListLoad,
  ListeningListActionTypes,
  ListeningListLoadSuccess,
  ListeningListError,
  ListeningListLoadNext,
  ListeningListLoadNextSuccess
} from '../actions/listening-list.action';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
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
      withLatestFrom(this.store$.select(selectors.listeningList)),
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

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private albuminService: AlbuminService
  ) { }
}
