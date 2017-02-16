import React from 'react'

class Filter extends React.Component{
  render() {
    let options = [...this.props.options];
    options.sort();
    options = options.map(option=>
      <option key={option} value={option}>{String(option).capitalize()}</option>
    );
    options.splice(0,0, (<option key={this.props.topOption}
                                 value={this.props.topOption}
                                 disabled={this.props.topOptionDisabled}>
                          {this.props.topOption}
                         </option>));

    let value = (this.props.value === null) ? this.props.topOption : this.props.value;
    return (
        <div className="filter">
          <label>{this.props.title}</label>
          <select value={value} onChange={this.props.onChange} className="form-control">
            {options}
          </select>
        </div>
    )
  }
};

export default Filter;
