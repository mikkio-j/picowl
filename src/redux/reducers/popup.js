import { SET_POPUP, CLEAR_POPUP } from '../actions/types';

const initialState = { item: {}, show: false };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_POPUP:
      return { item: payload, show: true };
    case CLEAR_POPUP:
      return { item: {}, show: false };
    default:
      return state;
  }
}
