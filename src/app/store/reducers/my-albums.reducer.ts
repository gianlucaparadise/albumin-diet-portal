import { MyAlbumsActions, MyAlbumsActionTypes } from '../actions/my-albums.action';
import { TaggedAlbum } from 'albumin-diet-types';

export interface MyAlbumsState {
  tags?: string[];
  showUntagged?: boolean;
  albumDescriptors?: TaggedAlbum[];
  errorMessage?: string;
}

export const initialState: MyAlbumsState = {
  albumDescriptors: [],
};

export function myAlbumsReducer(state = initialState, action: MyAlbumsActions): MyAlbumsState {
  switch (action.type) {
    case MyAlbumsActionTypes.LoadSuccess:
      return {
        tags: action.payload.tags,
        showUntagged: action.payload.showUntagged,
        albumDescriptors: action.payload.albumDescriptors
      };

    case MyAlbumsActionTypes.LoadNextSuccess:
      return {
        tags: state.tags,
        showUntagged: state.showUntagged,
        albumDescriptors: [...state.albumDescriptors, ...action.payload.albumDescriptors],
      };

    case MyAlbumsActionTypes.Error:
      return {
        errorMessage: `${action.payload.err}`
      };

    default:
      return state;
  }
}
