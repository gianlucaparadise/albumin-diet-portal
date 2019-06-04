import { AppState } from '../reducers';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TagState } from '../reducers/tag.reducer';

const selectFeature = createFeatureSelector<AppState, TagState>('tagFeature');

const selectTags = createSelector(
  selectFeature,
  (state: TagState) => state.tags
);

export const tagsSelector = {
  tagsFeature: selectFeature,
  tags: selectTags,
};
