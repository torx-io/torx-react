import * as types from '../constants/ActionTypes';
import { getUsers } from './userList';

export function setFilter(text) {
  return {
    type: types.SET_FILTER,
    text
  };
}

export function resetFilter() {
  return {
    type: types.RESET_FILTER
  };
}

export function clearFilter() {
  return dispatch => {
    dispatch(resetFilter());
    return dispatch(getUsers());
  };
}
