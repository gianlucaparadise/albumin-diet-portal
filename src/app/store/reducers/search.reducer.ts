import { SearchActions, SearchActionTypes } from '../actions/search.action';
import { UserAlbum } from 'albumin-diet-types';

export interface SearchState {
  keywords?: string;
  albumDescriptors?: UserAlbum[];
  errorMessage?: string;
}

export const initialState: SearchState = {
  keywords: '',
  albumDescriptors: [],
};

export function searchReducer(state = initialState, action: SearchActions): SearchState {
  switch (action.type) {
    case SearchActionTypes.Clear:
      return initialState;

    case SearchActionTypes.LoadSuccess:
      return {
        keywords: action.payload.keywords,
        albumDescriptors: action.payload.albumDescriptors
      };

    case SearchActionTypes.LoadNextSuccess:
      return {
        keywords: state.keywords,
        albumDescriptors: [...state.albumDescriptors, ...action.payload.albumDescriptors],
      };

    case SearchActionTypes.Error:
      return {
        errorMessage: `${action.payload.err}`
      };

    default:
      return state;
  }
}
