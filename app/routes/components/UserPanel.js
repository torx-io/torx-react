import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as Actions } from '../../actions';
import FilterPanel from './FilterPanel';
import UserTable from './UserTable';
import UserForm from './UserForm';

class UserPanel extends Component {
  componentWillMount() {
    const { actions } = this.props;
    actions.getUsers();
  }
  render() {
    const { user, userList, filter, actions } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-sm-6" id="user-list-widget">
            <h2>UserList</h2>
            <FilterPanel
              filter={filter}
              actions={actions}
            />
            <UserTable userList={userList} actions={actions} />
          </div>
          <div className="col-sm-4 col-sm-offset-2" id="user-form-widget">
            <h2>UserForm</h2>
            <UserForm
              user={user}
              actions={actions}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userList: state.userList,
    user: state.user,
    filter: state.filter
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

UserPanel.propTypes = {
  user: PropTypes.object.isRequired
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
