import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { TagState, tagsReducer } from './tag.reducer';
import { SearchState, searchReducer } from './search.reducer';
import { MyAlbumsState, myAlbumsReducer } from './my-albums.reducer';

export interface AppState {
  tagFeature: TagState;
  searchFeature: SearchState;
  myAlbumsFeature: MyAlbumsState;
}

export const reducers: ActionReducerMap<AppState> = {
  tagFeature: tagsReducer,
  searchFeature: searchReducer,
  myAlbumsFeature: myAlbumsReducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
