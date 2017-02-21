import React from 'react'

class Slider extends React.Component{
  render() {
    let step = (this.props.max-this.props.min)/this.props.steps;
    return (
        <div className="filter">
          <label>{this.props.title}</label>
          <input type="range"
                 min={this.props.min}
                 max={this.props.max}
                 value={this.props.value}
                 onChange={this.props.onChange} />
               Up to {this.props.value} minutes
        </div>
    )
  }
};

export default Slider;
