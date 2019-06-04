import { AppState } from '../reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SearchState } from '../reducers/search.reducer';

const selectFeature = createFeatureSelector<AppState, SearchState>('searchFeature');

const selectSearchAlbums = createSelector(
  selectFeature,
  (state: SearchState) => state.albumDescriptors
);

const selectSearchKeywords = createSelector(
  selectFeature,
  (state: SearchState) => state.keywords
);

export const searchSelectors = {
  searchFeature: selectFeature,
  searchAlbums: selectSearchAlbums,
  searchKeywords: selectSearchKeywords,
};
