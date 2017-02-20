import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'

class Restaurant extends React.Component{
  render() {
    return (
        <div className="restaurant row">
          <div className="col-xs-2 genre">
            {this.props.genre_letter}
          </div>
          <div className="col-xs-8">
            <a href={`/restaurants/${this.props.id}/`} className="title">{this.props.name} {this.render10bis()}</a>
            <p>Rating: {this.renderStars()}<br/>
               Delivery time: up to {this.props.delivery_time} minutes</p>
          </div>
          <div className="col-xs-2">
            <Link to={`restaurants/${this.props.id}/edit`}><button className="btn btn-default"><span className="glyphicon glyphicon-edit success"></span></button></Link>
            <button className="btn btn-default" onClick={() => this.props.handleDelete(this)}><span className="glyphicon glyphicon-trash error"></span></button>
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
    for (let i=this.props.rating; i<3; i++){
      stars.push(<span key={i} className="glyphicon glyphicon-star-empty"></span>)
    }
    return stars;
  }
};

export default Restaurant;
