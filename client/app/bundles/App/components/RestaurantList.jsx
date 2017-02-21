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
  componentWillMount() {
    let _this = this
    $.get('restaurants/').done(function(response){
      let delivery_times = _this._uniqueProperty(response, 'delivery_time');
      _this.setState({
        restaurants: response,
        genres: _this._uniqueProperty(response, 'genre'),
        ratings: _this._uniqueProperty(response, 'rating'),
        delivery_time_min: Math.min(delivery_times),
        delivery_time_max: Math.max(delivery_times),
      })
    })
  }
  render() {
    let selected_genre = this.state.selected_genre;
    let selected_speed = this.state.selected_speed;
    let selected_rating = this.state.selected_rating;

    let restaurants = []
    this.state.restaurants.forEach(function(restaurant) {
      if (['Any',restaurant.genre].includes(selected_genre) &&
          restaurant.delivery_time <= selected_speed &&
          (selected_rating ==='Any' || restaurant.rating >= selected_rating)) {
        restaurants.push(<Restaurant key={restaurant.id} {...restaurant} />)
      }
    });

    if (restaurants.length === 0){
      restaurants = (
        <div className="not-found">
          <img src="http://parade.condenast.com/wp-content/uploads/2014/06/seinfeld-soup-nazi-ftr.jpg" />
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
                        onChange={this._setGenre.bind(this)}/>
              </div>
              <div className="col-xs-4">
                <Filter title="Minimal Rating"
                        topOption="Any"
                        value={this.state.selected_rating}
                        options={this.state.ratings}
                        onChange={this._setRating.bind(this)}/>
              </div>
              <div className="col-xs-4">
                <Slider title="Speed"
                        value={this.state.selected_speed}
                        min="0" max="120"
                        onChange={this._setSpeed.bind(this)}/>
              </div>
            </div>
            <div className="content">
            {restaurants}
            </div>
        </div>
    )
  }
  _uniqueProperty(arr, property) {
    return [...new Set(arr.map(obj => obj[property]))];
  }
  _setGenre(e) {
    this.setState({ selected_genre: e.target.value })
  }
  _setSpeed(e) {
    this.setState({ selected_speed: e.target.value })
  }
  _setRating(e) {
    this.setState({ selected_rating: e.target.value })
  }
};

export default RestaurantList;
