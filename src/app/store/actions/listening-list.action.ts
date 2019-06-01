import { Action } from '@ngrx/store';
import { UserAlbum } from 'albumin-diet-types';

export enum ListeningListActionTypes {
  Error = '[ListeningList API] ListeningList API Error',

  Load = '[ListeningList Page] Load ListeningList',
  LoadSuccess = '[ListeningList API] ListeningList Loaded Success',

  LoadNext = '[ListeningList Page] Load ListeningList Next Page',
  LoadNextSuccess = '[ListeningList API] ListeningList Next Page Loaded Success',
}

export class ListeningListLoad implements Action {
  readonly type = ListeningListActionTypes.Load;
}

export class ListeningListLoadSuccess implements Action {
  readonly type = ListeningListActionTypes.LoadSuccess;

  constructor(readonly payload: {
    albumDescriptors: UserAlbum[]
  }) { }
}

export class ListeningListLoadNext implements Action {
  readonly type = ListeningListActionTypes.LoadNext;
}

export class ListeningListLoadNextSuccess implements Action {
  readonly type = ListeningListActionTypes.LoadNextSuccess;

  constructor(readonly payload: {
    albumDescriptors: UserAlbum[]
  }) { }
}

export class ListeningListError implements Action {
  readonly type = ListeningListActionTypes.Error;

  constructor(readonly payload: { err: any }) { }
}

export type ListeningListActions =
  ListeningListError |
  ListeningListLoad | ListeningListLoadSuccess |
  ListeningListLoadNext | ListeningListLoadNextSuccess;
