import React from 'react'

class Filter extends React.Component{
  render() {
    let options = this.props.options.map(option=>
      <option key={option} value={option}>{option.capitalize()}</option>
    )
    return (
        <div className="filter">
          <label>{this.props.title}</label>
          <select value={this.props.value} onChange={this.props.onChange} className="form-control">
            {options}
          </select>
        </div>
    )
  }
};

export default Filter;
