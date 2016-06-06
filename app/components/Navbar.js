import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
  render() {
    return (
      <div id='breadcrumbs' className='container'>
        <Link to='/'>Home</Link>
        <Link to='/about'>About Us</Link>
      </div>
    );
  }
}
