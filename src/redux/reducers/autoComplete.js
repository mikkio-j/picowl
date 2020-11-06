import {
  AUTO_COMPLETE,
  CLEAR_AUTO_COMPLETE,
  ERROR_AUTO_COMPLETE,
} from '../actions/types';

const initialState = { keywords: [], loaded: false };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTO_COMPLETE:
      return { ...state, keywords: payload, loaded: true };
    case CLEAR_AUTO_COMPLETE:
      return { ...state, keywords: [], loaded: false };
    case ERROR_AUTO_COMPLETE:
      return { ...state, keywords: [], loaded: true };
    default:
      return state;
  }
}
