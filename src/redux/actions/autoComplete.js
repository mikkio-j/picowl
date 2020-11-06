import axios from 'axios';
import {
  AUTO_COMPLETE,
  CLEAR_AUTO_COMPLETE,
  ERROR_AUTO_COMPLETE,
} from './types';

export const autoCompleteAction = (searchString) => async (dispatch) => {
  try {
    const res = await axios.get(
      `https://api.unsplash.com/search/collections?page=1&query=${searchString}&client_id=cNtd3x_olZnQdHZ4JWAOT5EFYa0IuEVkNP78RXZoPr4`
    );
    const autoComplete = res.data.results[0].tags.map(({ title }) => title);
    dispatch({
      type: CLEAR_AUTO_COMPLETE,
    });
    dispatch({
      type: AUTO_COMPLETE,
      payload: autoComplete,
    });
  } catch (err) {
    dispatch({
      type: ERROR_AUTO_COMPLETE,
      payload: err,
    });
  }
};
