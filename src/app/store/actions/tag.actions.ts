import { Action } from '@ngrx/store';
import { TagDescriptor } from 'albumin-diet-types';

export enum TagActionTypes {
  Error = '[Tags API] Tags API Error',

  Load = '[Tags Page] Load Tags',
  LoadSuccess = '[Tags API] Tags Loaded Success',
}

export class TagsLoad implements Action {
  readonly type = TagActionTypes.Load;
}

export class TagsLoadSuccess implements Action {
  readonly type = TagActionTypes.LoadSuccess;

  constructor(readonly payload: { tags: TagDescriptor[] }) { }
}

export class TagsError implements Action {
  readonly type = TagActionTypes.Error;

  constructor(readonly payload: { err: any }) { }
}

export type TagActions =
  TagsError |
  TagsLoad | TagsLoadSuccess;
