import { tagsSelector } from './tag.selector';
import { searchSelectors } from './search.selector';
import { myAlbumsSelectors } from './my-albums.selector';
import { listeningListSelectors } from './listening-list.selector';
import { albumDetailSelectors } from './album-detail.selector';

export const selectors = {
  ...tagsSelector,
  ...searchSelectors,
  ...myAlbumsSelectors,
  ...listeningListSelectors,
  ...albumDetailSelectors,
};
