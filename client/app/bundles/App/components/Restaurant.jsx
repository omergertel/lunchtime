import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'

class Restaurant extends React.Component{
  render() {
    return (
        <div className="restaurant row">
          <div className="col-xs-2 genre">
            {this.renderGenre()}
          </div>
          <div className="col-xs-8">
            <span className="title">{this.props.name} {this.render10bis()}</span>
            <p>Rating: {this.renderStars()}<br/>
               Delivery time: up to {this.props.delivery_time} minutes</p>
          </div>
          <div className="col-xs-2">
            <Link to={`restaurants/${this.props.id}/edit`}><span className="glyphicon glyphicon-edit"></span></Link>
            <span className="glyphicon glyphicon-trash error clickable" onClick={() => this.props.handleDelete(this)}></span>
          </div>
        </div>
    )
  }
  render10bis() {
    if (this.props.accepts_10bis){
      return <img src="assets/tenbis.png" />
    }
  }
  renderStars() {
    let stars = [];
    for (let i=0; i<this.props.rating; i++){
      stars.push(<span key={i} className="glyphicon glyphicon-star"></span>)
    }
    return stars;
  }
  renderGenre() {
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
