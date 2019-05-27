import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { TagState, tagsReducer } from './tag.reducer';

export interface AppState {
  tagFeature: TagState;
}

export const reducers: ActionReducerMap<AppState> = {
  tagFeature: tagsReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
