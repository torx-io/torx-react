import React, { Component } from 'react';
import UserPanel from './components/UserPanel';

class IndexContainer extends Component {
  render() {
    return (
      <div id='home-page' className='container'>
        <div>
          <UserPanel />
        </div>
      </div>
    );
  }
}

IndexContainer.propTypes = {
};

module.exports = IndexContainer;
