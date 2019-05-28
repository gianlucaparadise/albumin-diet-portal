import { Action } from '@ngrx/store';
import { UserAlbum } from 'albumin-diet-types';

export enum SearchActionTypes {
  Error = '[Search API] Search API Error',

  Load = '[Search Page] Load Search',
  LoadSuccess = '[Search API] Search Loaded Success',
}

export class SearchLoad implements Action {
  readonly type = SearchActionTypes.Load;

  constructor(readonly payload: { keywords: string }) { }
}

export class SearchLoadSuccess implements Action {
  readonly type = SearchActionTypes.LoadSuccess;

  constructor(readonly payload: { albumDescriptors: UserAlbum[] }) { }
}

export class SearchError implements Action {
  readonly type = SearchActionTypes.Error;

  constructor(readonly payload: { err: any }) { }
}

export type SearchActions =
  SearchError |
  SearchLoad | SearchLoadSuccess;
