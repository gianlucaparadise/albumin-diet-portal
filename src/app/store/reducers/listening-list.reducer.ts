import { ListeningListActions, ListeningListActionTypes } from '../actions/listening-list.action';
import { UserAlbum } from 'albumin-diet-types';

export interface ListeningListState {
  albumDescriptors?: UserAlbum[];
  errorMessage?: string;
}

export const initialState: ListeningListState = {
  albumDescriptors: [],
};

export function listeningListReducer(state = initialState, action: ListeningListActions): ListeningListState {
  switch (action.type) {
    case ListeningListActionTypes.LoadSuccess:
      return {
        albumDescriptors: action.payload.albumDescriptors
      };

    case ListeningListActionTypes.LoadNextSuccess:
      return {
        albumDescriptors: [...state.albumDescriptors, ...action.payload.albumDescriptors],
      };

    case ListeningListActionTypes.Error:
      return {
        errorMessage: `${action.payload.err}`
      };

    default:
      return state;
  }
}
