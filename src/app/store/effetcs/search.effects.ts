import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import {
  SearchLoad,
  SearchActionTypes,
  SearchLoadSuccess,
  SearchError,
  SearchLoadNext,
  SearchLoadNextSuccess
} from '../actions/search.action';
import { mergeMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { AlbuminService } from 'src/app/services/albumin/albumin.service';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { selectors } from '../selectors';

@Injectable()
export class SearchEffects {

  @Effect()
  loadSearch$ = this.actions$
    .pipe(
      ofType<SearchLoad>(SearchActionTypes.Load),
      mergeMap((action) => this.albuminService.searchAlbums(action.payload.keywords)
        .pipe(
          map(response => response.data),
          map(result => (new SearchLoadSuccess({
            keywords: action.payload.keywords,
            albumDescriptors: result
          }))),
          catchError((err) => of(new SearchError({ err })))
        )
      )
    );

  @Effect()
  loadSearchNext$ = this.actions$
    .pipe(
      ofType<SearchLoadNext>(SearchActionTypes.LoadNext),
      withLatestFrom(this.store$.select(selectors.search)),
      mergeMap(([action, search]) => (this.albuminService.searchAlbums(search.keywords, search.albumDescriptors.length))
        .pipe(
          map(response => response.data),
          map(result => (new SearchLoadNextSuccess({
            albumDescriptors: result
          }))),
          catchError((err) => of(new SearchError({ err })))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private store$: Store<AppState>,
    private albuminService: AlbuminService
  ) { }
}
