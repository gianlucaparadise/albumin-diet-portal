import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
  AlbumDetailLoad,
  AlbumDetailActionTypes,
  AlbumDetailLoadSuccess,
  AlbumDetailError,
} from '../actions/album-detail.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AlbuminService } from 'src/app/services/albumin/albumin.service';
import { of } from 'rxjs';

@Injectable()
export class AlbumDetailEffects {

  @Effect()
  loadAlbum$ = this.actions$
    .pipe(
      ofType<AlbumDetailLoad>(AlbumDetailActionTypes.Load),
      mergeMap((action) => (this.albuminService.getAlbum(action.payload.albumId))
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
    private albuminService: AlbuminService
  ) { }
}
