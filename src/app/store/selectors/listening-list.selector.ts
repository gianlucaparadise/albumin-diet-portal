import { AppState } from '../reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ListeningListState } from '../reducers/listening-list.reducer';

const selectFeature =  createFeatureSelector<AppState, ListeningListState>('listeningListFeature');

const selectListeningListAlbumDescriptors = createSelector(
  selectFeature,
  (state: ListeningListState) => state.albumDescriptors
);

export const listeningListSelectors = {
  listeningListFeature: selectFeature,
  listeningListAlbumDescriptors: selectListeningListAlbumDescriptors,
};
