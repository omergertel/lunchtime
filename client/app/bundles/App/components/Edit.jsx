import { hashHistory, Link } from 'react-router';
import React from 'react';
import $ from 'jquery';
import Filter from './Filter';
import Slider from './Slider';

class Edit extends React.Component {
  constructor() {
    super();
    this.state = {
      error: '',
      name: '',
      selected_genre: '',
      selected_speed: 120,
      selected_rating: 0,
      accepts_10bis: false,
      delivery_time_min: 0,
      delivery_time_max: 120,
      genres: [],
      ratings: [],
    };

    this.setName = this.setName.bind(this);
    this.setGenre = this.setGenre.bind(this);
    this.setRating = this.setRating.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.set10bis = this.set10bis.bind(this);
    this.save = this.save.bind(this);
  }
  componentWillMount() {
    $.get('restaurants/options').done((response) => {
      this.setState({
        genres: response.genre,
        delivery_time_min: response.delivery_time_min,
        delivery_time_max: response.delivery_time_max,
        ratings: response.ratings,
      });
    });

    if (this.props.params.restaurantId) {
      $.get(`restaurants/${this.props.params.restaurantId}`).done((response) => {
        this.setState({
          name: response.name,
          selected_genre: response.genre,
          selected_speed: response.delivery_time,
          selected_rating: response.rating,
          accepts_10bis: response.accepts_10bis,
        });
      });
    }
  }
  setName(e) {
    this.setState({ name: e.target.value });
  }
  setGenre(e) {
    this.setState({ selected_genre: e.target.value });
  }
  setSpeed(e) {
    this.setState({ selected_speed: Number(e.target.value) });
  }
  setRating(e) {
    this.setState({ selected_rating: e.target.value });
  }
  set10bis(e) {
    this.setState({ accepts_10bis: !!e.target.checked });
  }
  save(e) {
    e.preventDefault();
    const restaurant = {
      name: this.state.name,
      genre: this.state.selected_genre,
      delivery_time: this.state.selected_speed,
      rating: this.state.selected_rating,
      accepts_10bis: this.state.accepts_10bis,
    };
    if (!restaurant.name) {
      this.setState({ error: 'Name required' });
      return;
    }
    if (!restaurant.genre) {
      this.setState({ error: 'Please choose cuisine' });
      return;
    }
    if (restaurant.rating === null) {
      this.setState({ error: 'Please choose rating' });
      return;
    }

    const method = this.props.params.restaurantId ? 'PUT' : 'POST';
    const restaurantId = this.props.params.restaurantId || '';
    $
      .ajax({
        type: method,
        contentType: 'application/json; charset=utf-8',
        url: `restaurants/${restaurantId}`,
        data: JSON.stringify({ restaurant }),
        dataType: 'json',
      })
      .done(() => {
        hashHistory.push('/');
      });
  }
  render() {
    return (
      <div className="new-container">
        <div className="row form">
          <form className="col-xs-12">
            <h3>Submit Restaurant</h3>
            <div className="form-group">
              <label htmlFor={`input-${this.props.params.restaurantId}`}>Restaurant Name</label>
              <input
                id={`input-${this.props.params.restaurantId}`}
                onChange={this.setName}
                type="text"
                className="form-control"
                placeholder="Enter name"
                value={this.state.name}
              />
            </div>
            <Filter
              title="Cuisine"
              topOption="Choose one..."
              topOptionDisabled
              value={this.state.selected_genre}
              options={this.state.genres}
              onChange={this.setGenre}
            />
            <Filter
              title="Star Rating"
              topOption="Choose one..."
              topOptionDisabled
              value={this.state.selected_rating}
              options={this.state.ratings}
              onChange={this.setRating}
            />
            <Slider
              title="Speed"
              topOption="Choose one..."
              topOptionDisabled
              min={this.state.delivery_time_min}
              max={this.state.delivery_time_max}
              value={this.state.selected_speed}
              onChange={this.setSpeed}
            />
            <div className="checkbox">
              <label htmlFor="checkbox-10bis">
                <input
                  id="checkbox-10bis"
                  type="checkbox"
                  checked={this.state.accepts_10bis}
                  onChange={this.set10bis}
                />
                {' Accepts 10Bis'}
              </label>
            </div>
            <div className="actions">
              <button className="btn" onClick={this.save}>Save</button>
              <Link to="/">Cancel</Link>
            </div>
            <p className="error">{this.state.error}</p>
          </form>
        </div>
      </div>
    );
  }
}

Edit.propTypes = {
  params: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
};

export default Edit;
