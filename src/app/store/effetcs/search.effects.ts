import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { SearchLoad, SearchActionTypes, SearchLoadSuccess, SearchError } from '../actions/search.action';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { AlbuminService } from 'src/app/services/albumin/albumin.service';
import { of } from 'rxjs';

@Injectable()
export class SearchEffects {

  @Effect()
  loadSearch$ = this.actions$
    .pipe(
      ofType<SearchLoad>(SearchActionTypes.Load),
      mergeMap((action) => this.albuminService.searchAlbums(action.payload.keywords)
        .pipe(
          map(response => response.data),
          map(result => (new SearchLoadSuccess({ albumDescriptors: result }))),
          catchError((err) => of(new SearchError({ err })))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private albuminService: AlbuminService
  ) { }
}
