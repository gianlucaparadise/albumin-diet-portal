import { AppState } from '../reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AlbumDetailState } from '../reducers/album-detail.reducer';

const selectFeature = createFeatureSelector<AppState, AlbumDetailState>('albumDetailFeature');

const selectAlbumDetail = createSelector(
  selectFeature,
  (state) => state.albumDescriptor
);

export const albumDetailSelectors = {
  albumDetailFeature: selectFeature,
  albumDetail: selectAlbumDetail,
};
