import { AppState } from '../reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MyAlbumsState } from '../reducers/my-albums.reducer';

const selectFeature = createFeatureSelector<AppState, MyAlbumsState>('myAlbumsFeature');

const selectMyAlbumDescriptors = createSelector(
  selectFeature,
  (state: MyAlbumsState) => state.albumDescriptors
);

export const myAlbumsSelectors = {
  myAlbumsFeature: selectFeature,
  myAlbumDescriptors: selectMyAlbumDescriptors,
};
