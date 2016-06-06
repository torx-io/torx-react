import React, { Component, PropTypes } from 'react';

class CloseButton extends Component {
  constructor() {
    super();

    this._collapse = this._collapse.bind(this);
  }

  _collapse() {
    const { closeAction } = this.props;
    closeAction();
  }

  render() {
    return (
      <button type='button' className='close' onClick={this._collapse}><span className='glyphicon glyphicon-remove'></span></button>
    );
  }
}

CloseButton.propTypes = {
  closeAction: PropTypes.func.isRequired
};

module.exports = CloseButton;
