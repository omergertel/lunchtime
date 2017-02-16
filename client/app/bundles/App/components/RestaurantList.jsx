import React from 'react'
import Restaurant from './Restaurant'
import Filter from './Filter'
import Slider from './Slider'
import $ from 'jquery'

class RestaurantList extends React.Component{
  constructor(props) {
    super();
    this.state = {
      restaurants: [],
      genres: [],
      ratings: [],
      selected_genre: 'Any',
      selected_speed: 120,
      selected_rating: 'Any'
    };
  }
  handleRestaurantDelete(target) {
    let self = this;
    $.ajax({
      type: "DELETE",
      url: 'restaurants/' + target.props.id,
    }).done(function(response){
      self.loadData();
    });
  }
  componentWillMount() {
    this.loadData();
  }
  loadData() {
    let self = this;
    $.get('restaurants/').done(function(response){
      let delivery_times = self.uniqueProperty(response, 'delivery_time');
      self.setState({
        restaurants: response,
        genres: self.uniqueProperty(response, 'genre'),
        ratings: self.uniqueProperty(response, 'rating'),
        delivery_time_min: Math.min(delivery_times),
        delivery_time_max: Math.max(delivery_times),
      });
    });
  }
  render() {
    let selected_genre = this.state.selected_genre;
    let selected_speed = this.state.selected_speed;
    let selected_rating = this.state.selected_rating;

    let restaurants = [];
    let self = this;
    this.state.restaurants.forEach(function(restaurant) {
      if (['Any',restaurant.genre].includes(selected_genre) &&
          restaurant.delivery_time <= selected_speed &&
          (selected_rating ==='Any' || restaurant.rating >= selected_rating)) {
        restaurants.push(<Restaurant key={restaurant.id} handleDelete={self.handleRestaurantDelete.bind(self)} {...restaurant} />)
      }
    });

    if (restaurants.length === 0){
      restaurants = (
        <div className="not-found">
          <img src="assets/not_found.jpg" />
          <p>No lunch for you, come back one year!</p>
        </div>
      )
    }

    return (
        <div>
            <div className="filters row">
              <div className="col-xs-4">
                <Filter title="Cuisine"
                        topOption="Any"
                        value={this.state.selected_genre}
                        options={this.state.genres}
                        onChange={this.setGenre.bind(this)}/>
              </div>
              <div className="col-xs-4">
                <Filter title="Minimal Rating"
                        topOption="Any"
                        value={this.state.selected_rating}
                        options={this.state.ratings}
                        onChange={this.setRating.bind(this)}/>
              </div>
              <div className="col-xs-4">
                <Slider title="Speed"
                        value={this.state.selected_speed}
                        min="0" max="120"
                        onChange={this.setSpeed.bind(this)}/>
              </div>
            </div>
            <div className="content">
            {restaurants}
            </div>
        </div>
    )
  }
  uniqueProperty(arr, property) {
    return [...new Set(arr.map(obj => obj[property]))];
  }
  setGenre(e) {
    this.setState({ selected_genre: e.target.value })
  }
  setSpeed(e) {
    this.setState({ selected_speed: e.target.value })
  }
  setRating(e) {
    this.setState({ selected_rating: e.target.value })
  }
};

export default RestaurantList;
