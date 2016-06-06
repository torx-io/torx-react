import React, { Component } from 'react';
import { Link } from 'react-router';

class IndexContainer extends Component {
  render() {
    return (
      <div id='home-page' className='container'>
        <h1>Test</h1>
        <Link className='home-button' to='/about'><div className='home-button-container'><span className='home-button-text'>Link 1</span></div></Link>
        <Link className='home-button' to='/about'><div className='home-button-container'><span className='home-button-text'>Link 2</span></div></Link>
        <Link className='home-button' to='/about'><div className='home-button-container'><span className='home-button-text'>Link 3</span></div></Link>
      </div>
    );
  }
}

IndexContainer.propTypes = {
};

module.exports = IndexContainer;
