import { selectTags } from './tag.selector';
import { selectSearchAlbums, selectSearchKeywords, selectSearch } from './search.selector';
import { selectMyAlbums, selectMyAlbumDescriptors } from './my-albums.selector';
import { selectListeningList, selectListeningListAlbumDescriptors } from './listening-list.selector';

export const selectors = {
  tags: selectTags,

  search: selectSearch,
  searchAlbums: selectSearchAlbums,
  searchKeywords: selectSearchKeywords,

  myAlbums: selectMyAlbums,
  myAlbumDescriptors: selectMyAlbumDescriptors,

  listeningList: selectListeningList,
  listeningListAlbumDescriptors: selectListeningListAlbumDescriptors,
};
