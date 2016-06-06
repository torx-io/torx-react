import React, { Component, PropTypes } from 'react';

class CustomizeButton extends Component {
  constructor() {
    super();

    this._toggle = this._toggle.bind(this);
  }

  _toggle() {
    const { toggleAction } = this.props;
    toggleAction();    
  }

  render() {
    return (
      <button type='button' className='close' onClick={this._toggle}><span className='glyphicon glyphicon-cog'></span></button>
    );
  }
}

CustomizeButton.propTypes = {
  toggleAction: PropTypes.func.isRequired
};

module.exports = CustomizeButton;
