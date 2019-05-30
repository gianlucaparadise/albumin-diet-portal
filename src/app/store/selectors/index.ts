import { selectTags } from './tag.selector';
import { selectSearchAlbums, selectSearchKeywords, selectSearch } from './search.selector';

export const selectors = {
  tags: selectTags,

  search: selectSearch,
  searchAlbums: selectSearchAlbums,
  searchKeywords: selectSearchKeywords,
};
