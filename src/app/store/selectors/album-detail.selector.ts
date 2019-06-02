import { AppState } from '../reducers';

const selectAlbumDetailFeature = (state: AppState) => state.albumDetailFeature;
const selectAlbumDetail = (state: AppState) => state.albumDetailFeature.albumDescriptor;
const selectAlbumFull = (state: AppState) => (
  state.albumDetailFeature.albumDescriptor ? state.albumDetailFeature.albumDescriptor.album : undefined
);

export const albumDetailSelectors = {
  albumDetailFeature: selectAlbumDetailFeature,
  albumDetail: selectAlbumDetail,
  albumFull: selectAlbumFull,
};
