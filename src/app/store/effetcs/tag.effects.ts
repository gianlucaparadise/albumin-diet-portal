import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AlbuminService } from 'src/app/services/albumin/albumin.service';
import {
  TagActionTypes,
  TagsError,
  TagsLoad, TagsLoadSuccess,
} from '../actions/tag.actions';
import { ITag } from 'albumin-diet-types';
const UNTAGGED_NAME = 'Untagged';

@Injectable()
export class TagEffects {

  @Effect()
  loadTags$ = this.actions$
    .pipe(
      ofType<TagsLoad>(TagActionTypes.Load),
      mergeMap(() => this.albuminService.getTags()
        .pipe(
          map(response => response.data),
          map(appendUntaggedTag),
          map(tags => (new TagsLoadSuccess({ tags }))),
          catchError((err) => of(new TagsError({ err })))
        )
      )
    );

  constructor(
    private actions$: Actions,
    private albuminService: AlbuminService
  ) { }
}

function appendUntaggedTag(tags: ITag[]) {
  if (tags && tags.length > 0) {
    const untaggedTag: ITag = { name: UNTAGGED_NAME, uniqueId: 'untagged' };
    tags.unshift(untaggedTag);
  }
  return tags;
}
