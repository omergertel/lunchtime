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

    return (
        <div className="filter">
          <label>{this.props.title}</label>
          <select defaultValue={this.props.topOption} onChange={this.props.onChange} className="form-control">
            {options}
          </select>
        </div>
    )
  }
};

export default Filter;
