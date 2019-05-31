import { AppState } from '../reducers';

export const selectMyAlbums = (state: AppState) => state.myAlbumsFeature;
export const selectMyAlbumDescriptors = (state: AppState) => state.myAlbumsFeature.albumDescriptors;
