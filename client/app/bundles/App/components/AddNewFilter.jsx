import React from 'react'

class AddNewFilter extends React.Component{
  render(){
    let options = []
    this.props.options.forEach(o=>
      options.push(<option key={o} value={o}>{(''+o).capitalize()}</option>)
    );
    return (
      <div className="form-group">
        <label>{this.props.title}</label>
        <select className="form-control" defaultValue="" onChange={this.props.onChange}>
          <option value="" disabled >Choose One...</option>
          {options}
        </select>
      </div>
    )
  }
}

export default AddNewFilter;
