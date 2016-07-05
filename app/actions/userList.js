import * as types from '../constants/ActionTypes';
// import fetch from 'isomorphic-fetch';
// import { clearEditingUser } from './user.js';

var usersMock = [
  {user_id: 0,first_name: 'First', last_name: 'User', email_address: 'user1@test.com'},
  {user_id: 1,first_name: 'Second', last_name: 'User', email_address: 'user2@test.com'},
  {user_id: 2,first_name: 'Third', last_name: 'User', email_address: 'user3@test.com'},
  {user_id: 3,first_name: 'Fourth', last_name: 'User', email_address: 'user4@test.com'}
];

export function requestUsers() {
  return {
    type: types.REQUEST_USERS
  };
}

export function receiveUsers(users) {
  return {
    type: types.RECEIVE_USERS,
    users
  };
}

export function getUsers(filter) {
  return dispatch => {
    dispatch(requestUsers());
    dispatch(receiveUsers(usersMock.filter(function (user){
      return (user.email_address.match(filter) || user.first_name.match(filter) || user.last_name.match(filter));
    })));
  };
}

// export function putUser(user) {
//   return dispatch => {
//     return fetch('/api/v1/users/' + user.user_id, {
//       method: 'PUT',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     })
//       .then(() => dispatch(clearEditingUser()))
//       .then(() => dispatch(getUsers()));
//   };
// }
//
// export function postUser(user) {
//   return dispatch => {
//     return fetch('/api/v1/users/', {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//     })
//       .then(() => dispatch(clearEditingUser()))
//       .then(() => dispatch(getUsers()));
//   };
// }
//
// export function deleteUser(user) {
//   return dispatch => {
//     return fetch('/api/v1/users/' + user.user_id, {
//       method: 'DELETE'
//     })
//       .then(() => dispatch(clearEditingUser()))
//       .then(() => dispatch(getUsers()));
//   };
// }
