import { combineReducers } from 'redux';
import user from './user';
import userList from './userList';
import menu from './menu';

import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  user,
  userList,
  menu,
  routing: routerReducer
});

export default rootReducer;
