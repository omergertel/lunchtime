import React from 'react';
import { capitalize } from 'lodash';

function Filter(props) {
  let options = [...props.options];
  options.sort();
  options = options.map(option => (
    <option key={`option-${option}`} value={option}>{capitalize(String(option))}</option>
  ));
  options.splice(
    0,
    0,
    <option
      key={`option-${props.topOption}`}
      value={props.topOption}
      disabled={props.topOptionDisabled}
    >
      {props.topOption}
    </option>,
  );

  const value = props.value === null ? props.topOption : props.value;
  return (
    <div className="filter">
      <label htmlFor={`filter-${props.title}`}>{props.title}</label>
      <select
        id={`filter-${props.title}`}
        value={value}
        onChange={props.onChange}
        className="form-control"
      >
        {options}
      </select>
    </div>
  );
}

Filter.propTypes = {
  options: React.PropTypes.arrayOf(
    React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  ),
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
  title: React.PropTypes.string.isRequired,
  topOption: React.PropTypes.string.isRequired,
  topOptionDisabled: React.PropTypes.bool,
};

Filter.defaultProps = {
  topOptionDisabled: false,
  value: null,
  options: [],
};

export default Filter;
