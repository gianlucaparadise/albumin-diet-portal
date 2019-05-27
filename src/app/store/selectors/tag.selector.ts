import { AppState } from '../reducers';

export const selectTags = (state: AppState) => state.tagFeature.tags;
 
// export const selectTagCount = createSelector(
//   selectTag,
//   (state: TagState) => state.tags
// );