import React from 'react';
import { Link } from 'react-router';

class Restaurant extends React.Component {
  render10bis() {
    if (this.props.accepts_10bis) {
      return <img src="assets/tenbis.png" alt="10bis" />;
    }
    return '';
  }
  renderStars() {
    const stars = [];
    for (let i = 0; i < this.props.rating; i += 1) {
      stars.push(<span key={`star-${i}`} className="glyphicon glyphicon-star" />);
    }
    for (let i = this.props.rating; i < 3; i += 1) {
      stars.push(<span key={`star-${i}`} className="glyphicon glyphicon-star-empty" />);
    }
    return stars;
  }
  render() {
    return (
      <div className="restaurant row">
        <div className="col-xs-2 genre">
          {this.props.genre_letter}
        </div>
        <div className="col-xs-8">
          <a href={`/restaurants/${this.props.id}/`} className="title">
            {this.props.name} {this.render10bis()}
          </a>
          <p>
            Rating: {this.renderStars()}<br />
            Delivery time: up to {this.props.delivery_time} minutes
          </p>
        </div>
        <div className="col-xs-2">
          <Link to={`restaurants/${this.props.id}/edit`}>
            <button className="btn btn-default">
              <span className="glyphicon glyphicon-edit success" />
            </button>
          </Link>
          <button className="btn btn-default" onClick={() => this.props.handleDelete(this)}>
            <span className="glyphicon glyphicon-trash error" />
          </button>
        </div>
      </div>
    );
  }
}

Restaurant.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  delivery_time: React.PropTypes.number.isRequired,
  rating: React.PropTypes.number.isRequired,
  genre_letter: React.PropTypes.string.isRequired,
  accepts_10bis: React.PropTypes.bool.isRequired,
  handleDelete: React.PropTypes.func.isRequired,
};

export default Restaurant;
