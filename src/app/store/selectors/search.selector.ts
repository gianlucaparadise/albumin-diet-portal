import { AppState } from '../reducers';

export const selectSearch = (state: AppState) => state.searchFeature;
export const selectSearchAlbums = (state: AppState) => state.searchFeature.albumDescriptors;
export const selectSearchKeywords = (state: AppState) => state.searchFeature.keywords;
