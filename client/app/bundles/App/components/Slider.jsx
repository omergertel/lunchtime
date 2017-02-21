import React from 'react';

function Slider(props) {
  return (
    <div className="filter">
      <label htmlFor={`input-${props.title}`}>{props.title}</label>
      <input
        id={`input-${props.title}`}
        type="range"
        min={props.min}
        max={props.max}
        value={props.value}
        onChange={props.onChange}
      />
      Up to {props.value} minutes
    </div>
  );
}

Slider.propTypes = {
  title: React.PropTypes.string.isRequired,
  min: React.PropTypes.number.isRequired,
  max: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.number,
};

Slider.defaultProps = {
  value: 120,
};

export default Slider;
