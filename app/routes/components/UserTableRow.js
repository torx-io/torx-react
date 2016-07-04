import React, { PropTypes, Component } from 'react';

class UserTableRow extends Component {
  activateEditingUser() {
    const { actions, user } = this.props;
    actions.setEditingUser(user);
  }
  render() {
    const { user } = this.props;
    return (
      <tr>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email_address}</td>
        <td><a href='#' className='btn btn-default' onClick={(e) => this.activateEditingUser(e)}>Edit</a></td>
      </tr>
    );
  }
}

export default UserTableRow;
