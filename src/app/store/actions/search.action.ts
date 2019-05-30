import { Action } from '@ngrx/store';
import { UserAlbum } from 'albumin-diet-types';

export enum SearchActionTypes {
  Error = '[Search API] Search API Error',

  Clear = '[Search Page] Clear Search',

  Load = '[Search Page] Load Search',
  LoadSuccess = '[Search API] Search Loaded Success',

  LoadNext = '[Search Page] Load Search Next Page',
  LoadNextSuccess = '[Search API] Search Next Page Loaded Success',
}

export class SearchClear implements Action {
  readonly type = SearchActionTypes.Clear;
}

export class SearchLoad implements Action {
  readonly type = SearchActionTypes.Load;

  constructor(readonly payload: {
    keywords: string,
  }) { }
}

export class SearchLoadSuccess implements Action {
  readonly type = SearchActionTypes.LoadSuccess;

  constructor(readonly payload: {
    keywords: string,
    albumDescriptors: UserAlbum[]
  }) { }
}

export class SearchLoadNext implements Action {
  readonly type = SearchActionTypes.LoadNext;
}

export class SearchLoadNextSuccess implements Action {
  readonly type = SearchActionTypes.LoadNextSuccess;

  constructor(readonly payload: {
    albumDescriptors: UserAlbum[]
  }) { }
}

export class SearchError implements Action {
  readonly type = SearchActionTypes.Error;

  constructor(readonly payload: { err: any }) { }
}

export type SearchActions =
  SearchError |
  SearchClear |
  SearchLoad | SearchLoadSuccess |
  SearchLoadNext | SearchLoadNextSuccess;
