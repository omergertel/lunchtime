import React from 'react'

let Restaurant = React.createClass({
  render() {
    return (
        <div className="restaurant">
            <h3>{this.props.name}</h3>
        </div>
    )
  }
});

export default Restaurant;
