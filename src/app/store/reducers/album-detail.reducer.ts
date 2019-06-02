import { AlbumDetailActions, AlbumDetailActionTypes } from '../actions/album-detail.action';
import { TaggedAlbum } from 'albumin-diet-types';

export interface AlbumDetailState {
  albumDescriptor?: TaggedAlbum;
  errorMessage?: string;
}

export const initialState: AlbumDetailState = {

};

export function albumDetailReducer(state = initialState, action: AlbumDetailActions): AlbumDetailState {
  switch (action.type) {
    // TODO: to handle this action I need to merge all reducers into the same one
    // case AlbmDetailActionTypes.Select:
    //   return

    case AlbumDetailActionTypes.LoadSuccess:
      return {
        albumDescriptor: action.payload.albumDescriptor
      };

    case AlbumDetailActionTypes.Error:
      return {
        errorMessage: `${action.payload.err}`
      };

    default:
      return state;
  }
}
