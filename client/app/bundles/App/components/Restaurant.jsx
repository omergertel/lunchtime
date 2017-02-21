import React from 'react'

class Restaurant extends React.Component{
  render() {
    return (
        <div className="restaurant row">
          <div className="col-xs-2 genre">
            {this._renderGenre()}
          </div>
          <div className="col-xs-8">
            <span className="title">{this.props.name} {this._render10bis()}</span>
            <p>Rating: {this._renderStars()}<br/>
               Delivery time: up to {this.props.delivery_time} minutes</p>
          </div>
        </div>
    )
  }
  _render10bis() {
    if (this.props.accepts_10bis){
      return <img src="assets/tenbis.png" />
    }
  }
  _renderStars() {
    let stars = [];
    for (let i=0; i<this.props.rating; i++){
      stars.push(<span key={i} className="glyphicon glyphicon-star"></span>)
    }
    return stars;
  }
  _renderGenre() {
    switch (this.props.genre) {
      case "sushi":
        return 'D'
      case "burgers":
        return 'A'
      default:
        return 'Z'
    }
  }
};

export default Restaurant;
