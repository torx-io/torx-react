import * as types from '../constants/ActionTypes';
// import fetch from 'isomorphic-fetch';

// export function checkCurrentUser() {
//   return dispatch => {
//     dispatch(checkingCurrentUser());
//     return fetch('/auth/current_user', {
//       credentials: 'include'
//     })
//     .then(response => response.json())
//     .then(json => dispatch(settingCurrentUser(json)));
//   };
// }

export function checkingCurrentUser() {
  return {
    type: types.CHECK_CURRENT_USER
  };
}

export function setEditingUser(user) {
  return {
    type: types.SET_EDITING_USER,
    user
  };
}
