import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { default as Actions } from '../actions';
import Navbar from './Navbar';
import Footer from './Footer';

class App extends Component {
  componentWillMount() {
    const { actions } = this.props;

  }
  componentDidMount() {
    const { actions } = this.props;

  }
  componentWillReceiveProps(nextProps) {
    const { user } = this.props;

  }
  render() {
    return (
      <div>
        <Navbar />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

App.propTypes = {
  user: PropTypes.object.isRequired
};

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
