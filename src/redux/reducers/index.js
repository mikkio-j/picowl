import { combineReducers } from 'redux';
import autoComplete from './autoComplete';
import searchPhotos from './searchPhotos';
import popup from './popup';

export default combineReducers({ autoComplete, searchPhotos, popup });
