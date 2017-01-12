import React from 'react'
import Restaurant from './Restaurant'

export default React.createClass({
  render() {
    let restaurants = [];
    for (let i=0;i<1;i++){
        restaurants.push(<Restaurant name="a"/>)
    }
    return (
        <div className="top">
            {restaurants}
        </div>
    )
  }
})
