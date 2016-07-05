import { SET_FILTER, RESET_FILTER } from '../constants/ActionTypes';

const initialState = {
  text: ''
};

export default function filter(state = initialState, action) {
  switch(action.type) {
  case SET_FILTER:
    return Object.assign({}, state, {
      text: action.text
    });
  case RESET_FILTER:
    return Object.assign({}, state, {
      text: ''
    });
  default:
    return state;
  }
}
