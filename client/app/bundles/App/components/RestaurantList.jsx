import React from 'react';
import $ from 'jquery';
import Restaurant from './Restaurant';
import Filter from './Filter';
import Slider from './Slider';

class RestaurantList extends React.Component {
  static uniqueProperty(arr, property) {
    return [...new Set(arr.map(obj => obj[property]))];
  }
  constructor() {
    super();
    this.state = {
      restaurants: [],
      genres: [],
      ratings: [],
      selectedGenre: 'Any',
      selectedSpeed: 120,
      selectedRating: 'Any',
    };

    this.setGenre = this.setGenre.bind(this);
    this.setRating = this.setRating.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.handleRestaurantDelete = this.handleRestaurantDelete.bind(this);
  }
  componentWillMount() {
    this.loadData();
  }
  setGenre(e) {
    this.setState({ selectedGenre: e.target.value });
  }
  setSpeed(e) {
    this.setState({ selectedSpeed: Number(e.target.value) });
  }
  setRating(e) {
    this.setState({ selectedRating: e.target.value });
  }
  loadData() {
    $.get('restaurants/').done((response) => {
      const deliveryTimes = RestaurantList.uniqueProperty(response, 'delivery_time')
        .map(deliveryTime => Number(deliveryTime));
      this.setState({
        restaurants: response,
        genres: RestaurantList.uniqueProperty(response, 'genre'),
        ratings: RestaurantList.uniqueProperty(response, 'rating'),
        delivery_time_min: Math.min(deliveryTimes),
        delivery_time_max: Math.max(deliveryTimes),
      });
    });
  }
  handleRestaurantDelete(target) {
    $
      .ajax({
        type: 'DELETE',
        url: `restaurants/${target.props.id}`,
      })
      .done(() => {
        this.loadData();
      });
  }
  render() {
    const selectedGenre = this.state.selectedGenre;
    const selectedSpeed = this.state.selectedSpeed;
    const selectedRating = this.state.selectedRating;

    let restaurants = [];
    this.state.restaurants.forEach((restaurant) => {
      if (
        ['Any', restaurant.genre].includes(selectedGenre) &&
        restaurant.delivery_time <= selectedSpeed &&
        (selectedRating === 'Any' || restaurant.rating >= selectedRating)
      ) {
        restaurants.push(
          <Restaurant
            key={`restaurant-${restaurant.id}`}
            handleDelete={this.handleRestaurantDelete}
            {...restaurant}
          />,
        );
      }
    });

    if (restaurants.length === 0) {
      restaurants = (
        <div className="not-found">
          <img src="assets/not_found.jpg" alt="not found" />
          <p>No lunch for you, come back one year!</p>
        </div>
      );
    }

    return (
      <div>
        <div className="filters row">
          <div className="col-xs-4">
            <Filter
              title="Cuisine"
              topOption="Any"
              value={this.state.selectedGenre}
              options={this.state.genres}
              onChange={this.setGenre}
            />
          </div>
          <div className="col-xs-4">
            <Filter
              title="Minimal Rating"
              topOption="Any"
              value={this.state.selectedRating}
              options={this.state.ratings}
              onChange={this.setRating}
            />
          </div>
          <div className="col-xs-4">
            <Slider
              title="Speed"
              value={this.state.selectedSpeed}
              min={0}
              max={120}
              onChange={this.setSpeed}
            />
          </div>
        </div>
        <div className="content">
          {restaurants}
        </div>
      </div>
    );
  }
}

export default RestaurantList;
