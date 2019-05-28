import { SearchActions, SearchActionTypes } from '../actions/search.action';
import { UserAlbum } from 'albumin-diet-types';

export interface SearchState {
  albumDescriptors?: UserAlbum[];
  errorMessage?: string;
}

export const initialState: SearchState = {
  albumDescriptors: []
};

export function searchReducer(state = initialState, action: SearchActions): SearchState {
  switch (action.type) {
    case SearchActionTypes.LoadSuccess:
      return {
        albumDescriptors: action.payload.albumDescriptors
      };

    case SearchActionTypes.Error:
      return {
        errorMessage: `${action.payload.err}`
      };

    default:
      return state;
  }
}
