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

export interface AppState {
  tagFeature: TagState;
  searchFeature: SearchState;
}

export const reducers: ActionReducerMap<AppState> = {
  tagFeature: tagsReducer,
  searchFeature: searchReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
