import React, { PropTypes, Component } from 'react';

export default class UserForm extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.updateFirstName = this.updateFirstName.bind(this);
    this.updateLastName = this.updateLastName.bind(this);
    this.updateEmailAddress = this.updateEmailAddress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.first_name !== '' && nextProps.user.last_name !== '' && nextProps.user.email_address !== '') {
      this.firstName.value = nextProps.user.first_name;
      this.lastName.value = nextProps.user.last_name;
      this.emailAddress.value = nextProps.user.email_address;
    } else {
      this.firstName.value = '';
      this.lastName.value = '';
      this.emailAddress.value = '';
    }
  }

  handleDelete(e) {
    const { actions, user } = this.props;
    e.preventDefault();
    actions.deleteUser(user);
  }

  handleSave(e) {
    const { actions } = this.props;
    e.preventDefault();
    actions.postUser({
      first_name: this.firstName.value,
      last_name: this.lastName.value,
      email_address: this.emailAddress.value
    });
  }

  handleUpdate(e) {
    const { actions, user } = this.props;
    e.preventDefault();
    let updatedUser = Object.assign({}, user, {
      first_name: this.firstName.value,
      last_name: this.lastName.value,
      email_address: this.emailAddress.value
    });
    actions.putUser(updatedUser);
  }

  updateFirstName(ref) {
    this.firstName = ref;
  }

  updateLastName(ref) {
    this.lastName = ref;
  }
  
  updateEmailAddress(ref) {
    this.emailAddress = ref;
  }

  render() {
    const { actions, user } = this.props;
    return (
      <form onSubmit={this.handleSave}>
        <div className="form-group">
          <label htmlFor='first_name'>First Name</label>
          <input ref={this.updateFirstName} name='first_name' type='text' className='form-control' id='first_name' required />
        </div>
        <div className="form-group">
          <label htmlFor='last_name'>Last Name</label>
          <input ref={this.updateLastName} name='last_name' type='text' className='form-control' id='last_name' required />
        </div>
        <div className="form-group">
          <label htmlFor='email_address'>Email</label>
          <input ref={this.updateEmailAddress} name='email_address' type='email' className='form-control' id='email_address' required />
        </div>
        {!user.user_id?<button type='submit' className='btn btn-default'>Add</button>:null}
        {user.user_id?<button className='btn btn-default' onClick={this.handleUpdate}>Update User</button>:null}
        {user.user_id?<button className='btn btn-default' onClick={this.handleDelete}>Delete</button>:null}
        {user.user_id?<button className='btn btn-default' onClick={actions.clearEditingUser}>Cancel</button>:null}
      </form>
    );
  }
}
