import axios from 'axios';
import {
  FETCH_PHOTOS,
  CLEAR_FETCH_PHOTOS,
  ERROR_FETCH_PHOTOS,
  FETCH_MORE_PHOTOS,
} from './types';

export const searchPhotosAction = (searchString, pageNumber) => async (
  dispatch
) => {
  try {
    const res = await axios.get(
      `https://api.unsplash.com/search/photos?page=${pageNumber}&query=${searchString}&client_id=cNtd3x_olZnQdHZ4JWAOT5EFYa0IuEVkNP78RXZoPr4`
    );
    const fetchedPhotos = res.data.results;

    if (pageNumber === 1) {
      dispatch({
        type: CLEAR_FETCH_PHOTOS,
      });
      dispatch({
        type: FETCH_PHOTOS,
        payload: fetchedPhotos,
      });
    } else {
      dispatch({
        type: FETCH_MORE_PHOTOS,
        payload: fetchedPhotos,
      });
    }
  } catch (err) {
    dispatch({
      type: ERROR_FETCH_PHOTOS,
      payload: err,
    });
  }
};
