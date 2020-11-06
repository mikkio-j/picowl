import { SET_POPUP, CLEAR_POPUP } from './types';

export const popupAction = (item) => (dispatch) => {
  dispatch({
    type: SET_POPUP,
    payload: item,
  });
};

export const clearPopupAction = () => (dispatch) => {
  dispatch({
    type: CLEAR_POPUP,
  });
};
