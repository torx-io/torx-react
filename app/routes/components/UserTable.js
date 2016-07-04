import React, { PropTypes, Component } from 'react';
import UserTableRow from './UserTableRow';

class UserTable extends Component {
  render() {
    const { userList, actions } = this.props;
    var rows = [];
    userList.users.forEach(function(user) {
      rows.push(<UserTableRow key={user.user_id} user={user} actions={actions} />);
    });
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default UserTable;
