import { AppState } from '../reducers';

export const selectSearch = (state: AppState) => state.searchFeature.albumDescriptors;
