import {
  FETCH_PHOTOS,
  CLEAR_FETCH_PHOTOS,
  ERROR_FETCH_PHOTOS,
} from '../actions/types';

const initialState = { photos: [], loaded: false };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case FETCH_PHOTOS:
      return { photos: payload, loaded: true };
    case CLEAR_FETCH_PHOTOS:
      return { photos: [], loaded: false };
    case ERROR_FETCH_PHOTOS:
      return { photos: [], loaded: true };
    default:
      return state;
  }
}
