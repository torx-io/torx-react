import * as types from '../constants/ActionTypes';
import fetch from 'isomorphic-fetch';
import { clearEditingUser } from './user.js';

export function postUser(user) {
  return dispatch => {
    return fetch('/api/v1/users/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(() => dispatch(clearEditingUser()))
      .then(() => dispatch(getUsers()));
  };
}

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
    if (typeof filter !== 'undefined' && filter !== '') {
      return fetch('/api/v1/users/?search=' + filter)
        .then(response => response.json())
        .then(json => dispatch(receiveUsers(json)));
    } else {
      return fetch('/api/v1/users')
        .then(response => response.json())
        .then(json => dispatch(receiveUsers(json)));
    }
  };
}

export function putUser(user) {
  return dispatch => {
    return fetch('/api/v1/users/' + user.user_id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(() => dispatch(clearEditingUser()))
      .then(() => dispatch(getUsers()));
  };
}

export function deleteUser(user) {
  return dispatch => {
    return fetch('/api/v1/users/' + user.user_id, {
      method: 'DELETE'
    })
      .then(() => dispatch(clearEditingUser()))
      .then(() => dispatch(getUsers()));
  };
}