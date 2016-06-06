import { SET_CURRENT_USER, CHECK_CURRENT_USER } from '../constants/ActionTypes';

const initialState = {
  first_name: '',
  last_name: '',
  email_address: '',
  isFetching: false
};

export default function user(state = initialState, action) {
  switch(action.type) {
  case SET_CURRENT_USER:
    return Object.assign({}, state, {
      first_name: (action.user.first_name ? action.user.first_name : ''),
      last_name: (action.user.last_name ? action.user.last_name : ''),
      email_address: (action.user.email_address ? action.user.email_address : ''),
      isFetching: false
    });
  case CHECK_CURRENT_USER:
    return Object.assign({}, state, {
      isFetching: true
    });
  default:
    return state;
  }
}
