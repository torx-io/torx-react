import * as filter from './filter';
import * as userList from './userList';
import * as user from './user';
import * as menu from './menu';

const Actions = Object.assign({}, filter, userList, user, menu);

export default Actions;
