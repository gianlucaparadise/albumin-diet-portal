import { Action } from '@ngrx/store';
import { TaggedAlbum } from 'albumin-diet-types';

export enum AlbumDetailActionTypes {
  Error = '[AlbumDetail API] AlbumDetail API Error',

  Select = '[AlbumDetail Page] Select AlbumDetail',

  Load = '[AlbumDetail Page] Load AlbumDetail',
  LoadSuccess = '[AlbumDetail API] AlbumDetail Loaded Success',
}

// TODO: to handle this action I need to merge all reducers into the same one
// export class AlbumDetailSelect implements Action {
//   readonly type = AlbumDetailActionTypes.Select;

//   constructor(readonly payload: {
//     albumDescriptor: UserAlbum,
//     origin: 'listening-list' | 'my-albums' | 'search'
//   }) { }
// }

export class AlbumDetailLoad implements Action {
  readonly type = AlbumDetailActionTypes.Load;

  constructor(readonly payload: {
    albumId: string
  }) {}
}

export class AlbumDetailLoadSuccess implements Action {
  readonly type = AlbumDetailActionTypes.LoadSuccess;

  constructor(readonly payload: {
    albumDescriptor: TaggedAlbum
  }) { }
}

export class AlbumDetailError implements Action {
  readonly type = AlbumDetailActionTypes.Error;

  constructor(readonly payload: { err: any }) { }
}

export type AlbumDetailActions =
  AlbumDetailError |
  // AlbumDetailSelect |
  AlbumDetailLoad | AlbumDetailLoadSuccess;
