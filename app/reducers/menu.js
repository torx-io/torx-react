import { TOGGLE_MENU } from '../constants/ActionTypes';

const initialState = {
  isExpanded: false
};

export default function insight(state = initialState, action) {
  switch(action.type) {
  case TOGGLE_MENU:
    return Object.assign({}, state, {
      isExpanded: !state.isExpanded
    });

  default:
    return state;
  }
}
