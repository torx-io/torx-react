import React, { PropTypes, Component } from 'react';

class UserTableRow extends Component {
  constructor() {
    super();
    this.activateEditingUser = this.activateEditingUser.bind(this);
  }

  activateEditingUser(e) {
    const { actions, user } = this.props;
    e.preventDefault();
    actions.setEditingUser(user);
  }
  render() {
    const { user } = this.props;
    return (
      <tr>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email_address}</td>
        <td><a href='#' className='btn btn-default' onClick={this.activateEditingUser}>Edit</a></td>
      </tr>
    );
  }
}

export default UserTableRow;
