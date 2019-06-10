import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
  MyAlbumsLoad,
  MyAlbumsActionTypes,
  MyAlbumsLoadSuccess,
  MyAlbumsError,
  MyAlbumsLoadNext,
  MyAlbumsLoadNextSuccess,
  MyAlbumsRemove,
  MyAlbumsAdd
} from '../actions/my-albums.action';
import { mergeMap, map, catchError, withLatestFrom, filter } from 'rxjs/operators';
import { AlbuminService } from 'src/app/services/albumin/albumin.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { selectors } from '../selectors';

@Injectable()
export class MyAlbumsEffects {

  @Effect()
  loadAlbums$ = this.actions$
    .pipe(
      ofType<MyAlbumsLoad>(MyAlbumsActionTypes.Load),
      mergeMap((action) => (
        this.albuminService.getAlbums(
          action.payload.tags,
          action.payload.showUntagged
        )
      )
        .pipe(
          map(response => response.data),
          map(result => (new MyAlbumsLoadSuccess({
            tags: action.payload.tags,
            showUntagged: action.payload.showUntagged,
            albumDescriptors: result
          }))),
          catchError((err) => of(new MyAlbumsError({ err })))
        )
      )
    );

  @Effect()
  loadAlbumsNext$ = this.actions$
    .pipe(
      ofType<MyAlbumsLoadNext>(MyAlbumsActionTypes.LoadNext),
      withLatestFrom(this.store$.select(selectors.myAlbumsFeature)),
      mergeMap(([action, myAlbums]) => (
        this.albuminService.getAlbums(
          myAlbums.tags,
          myAlbums.showUntagged,
          myAlbums.albumDescriptors.length
        )
      )
        .pipe(
          map(response => response.data),
          map(result => (new MyAlbumsLoadNextSuccess({
            albumDescriptors: result
          }))),
          catchError((err) => of(new MyAlbumsError({ err })))
        )
      )
    );

  // @Effect()
  // addAlbum$ = this.actions$
  //   .pipe(
  //     ofType<MyAlbumsAdd>(MyAlbumsActionTypes.Add),
  //     withLatestFrom(this.store$.select(selectors.myAlbumDescriptors)),
  //     filter(([action, myAlbums]) => !!myAlbums),
  //     mergeMap(([action, myAlbums]) => {
  //       // TODO: I need to chek is matches the filter first
  //       myAlbums.push(action.payload.albumDescriptor);
  //       return of(new MyAlbumsLoadSuccess({
  //         albumDescriptors: myAlbums
  //       }));
  //     })
  //   );

  @Effect()
  removeAlbum$ = this.actions$
    .pipe(
      ofType<MyAlbumsRemove>(MyAlbumsActionTypes.Remove),
      withLatestFrom(this.store$.select(selectors.myAlbumsFeature)),
      filter(([action, myAlbumsFeature]) => !!myAlbumsFeature.albumDescriptors),
      mergeMap(([action, myAlbumsFeature]) => {
        const myAlbums = myAlbumsFeature.albumDescriptors;
        const index = myAlbums.findIndex(a => a.album.id === action.payload.albumId);
        const removed = myAlbums.splice(index, 1);
        return of(new MyAlbumsLoadSuccess({
          showUntagged: myAlbumsFeature.showUntagged,
          tags: myAlbumsFeature.tags,
          albumDescriptors: myAlbums
        }));
      })
    );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private albuminService: AlbuminService
  ) { }
}
