import { AppState } from '../reducers';

export const selectListeningList = (state: AppState) => state.listeningListFeature;
export const selectListeningListAlbumDescriptors = (state: AppState) => state.listeningListFeature.albumDescriptors;
