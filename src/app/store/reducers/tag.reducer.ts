import { ITag } from 'albumin-diet-types';
import { TagActions, TagActionTypes } from '../actions/tag.actions';

export interface TagState {
  tags?: ITag[];
  errorMessage?: string;
}

export const initialState: TagState = {
  tags: []
};

export function tagsReducer(state = initialState, action: TagActions): TagState {
  switch (action.type) {
    case TagActionTypes.LoadSuccess:
      return {
        tags: action.payload.tags
      };

    case TagActionTypes.Error:
      return {
        errorMessage: `${action.payload.err}`
      };

    default:
      return state;
  }
}
