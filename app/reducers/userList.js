import { REQUEST_USERS, RECEIVE_USERS } from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  users: []
};

export default function userList(state = initialState, action) {
  switch(action.type) {
  case REQUEST_USERS:
    return Object.assign({}, state, {
      isFetching: true,
      users: state.users
    });
  case RECEIVE_USERS:
    return Object.assign({}, state, {
      isFetching: false,
      users: action.users
    });
  default:
    return state;
  }
}
