import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import DevTools from './DevTools';
import routes from '../routes';

class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <div>
          <Router history={history} routes={routes} />
          <DevTools store={store} />
        </div>
      </Provider>
    );
  }
}

Root.PropTypes = {
  store: PropTypes.object.isRequired
};

module.exports = Root;
