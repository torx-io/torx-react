import React, { Component } from 'react';

export default class FilterPanel extends Component {
  constructor() {
    super();
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }
  handleFilterChange(e) {
    const { actions } = this.props;
    actions.setFilter(e.target.value);
    actions.getUsers(e.target.value);
  }
  render() {
    const { actions, filter } = this.props;
    const filterCloseStyle = {
      pointerEvents: 'visible'
    };
    return (
      <div className='row'>
        <div className='col-xs-6'>
          <form className='form-group'>
            <input ref='filter' type='text' className='form-control' placeholder='Enter your filter here ...' id='filter' value={filter.text} onChange={this.handleFilterChange} />
              {filter.text?<span className='glyphicon glyphicon-remove form-control-feedback' style={filterCloseStyle} onClick={actions.clearFilter}></span>:null}
          </form>
        </div>
      </div>
    );
  }
}
