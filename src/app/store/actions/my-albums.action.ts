import { Action } from '@ngrx/store';
import { TaggedAlbum } from 'albumin-diet-types';

export enum MyAlbumsActionTypes {
  Error = '[MyAlbums API] MyAlbums API Error',

  Load = '[MyAlbums Page] Load MyAlbums',
  LoadSuccess = '[MyAlbums API] MyAlbums Loaded Success',

  LoadNext = '[MyAlbums Page] Load MyAlbums Next Page',
  LoadNextSuccess = '[MyAlbums API] MyAlbums Next Page Loaded Success',

  Add = '[MyAlbums API] Add to MyAlbums',
  Remove = '[MyAlbums API] Remove from MyAlbums',
}

export class MyAlbumsLoad implements Action {
  readonly type = MyAlbumsActionTypes.Load;

  constructor(readonly payload: {
    tags: string[],
    showUntagged: boolean
  }) { }
}

export class MyAlbumsLoadSuccess implements Action {
  readonly type = MyAlbumsActionTypes.LoadSuccess;

  constructor(readonly payload: {
    tags: string[],
    showUntagged: boolean,
    albumDescriptors: TaggedAlbum[]
  }) { }
}

export class MyAlbumsLoadNext implements Action {
  readonly type = MyAlbumsActionTypes.LoadNext;
}

export class MyAlbumsLoadNextSuccess implements Action {
  readonly type = MyAlbumsActionTypes.LoadNextSuccess;

  constructor(readonly payload: {
    albumDescriptors: TaggedAlbum[]
  }) { }
}

export class MyAlbumsAdd implements Action {
  readonly type = MyAlbumsActionTypes.Add;

  constructor(readonly payload: {
    albumDescriptor: TaggedAlbum
  }) { }
}

export class MyAlbumsRemove implements Action {
  readonly type = MyAlbumsActionTypes.Remove;

  constructor(readonly payload: {
    albumId: string
  }) { }
}

export class MyAlbumsError implements Action {
  readonly type = MyAlbumsActionTypes.Error;

  constructor(readonly payload: { err: any }) { }
}

export type MyAlbumsActions =
  MyAlbumsError |
  MyAlbumsLoad | MyAlbumsLoadSuccess |
  MyAlbumsLoadNext | MyAlbumsLoadNextSuccess;
