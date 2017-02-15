import React from 'react'
import Restaurant from './Restaurant'
import Filter from './Filter'
import $ from 'jquery'

class RestaurantList extends React.Component{
  constructor(props) {
    super();
    this.state = {
      restaurants: [],
      genres: ['Any'],
      speeds: ['Any'],
      ratings: ['Any'],
      selected_genre: 'Any',
      selected_speed: 'Any',
      selected_rating: 'Any'
    };
  }
  componentWillMount() {
    let _this = this
    $.get('restaurants/').done(function(response){
      _this.setState({
        restaurants: response,
        genres: _this._uniqueProperty(response, 'genre'),
        speeds: _this._uniqueProperty(response, 'delivery_time'),
        ratings: _this._uniqueProperty(response, 'rating')
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
          ['Any',restaurant.delivery_time].includes(selected_speed) &&
          ['Any',String(restaurant.rating)].includes(String(selected_rating))) {
        restaurants.push(<Restaurant key={restaurant.id} {...restaurant} />)
      }
    });

    if (restaurants.length===0){
      restaurants = (
        <div className="not-found">
          <img src="http://parade.condenast.com/wp-content/uploads/2014/06/seinfeld-soup-nazi-ftr.jpg" />
          <p>No lunch for you, come back one year!</p>
        </div>
      )
    }

    return (
        <div className="content">
            <div className="filters row">
              <div className="col-xs-4">
                <Filter title="Cuisine"
                        value={this.state.selected_genre}
                        options={this.state.genres}
                        onChange={this._setGenre.bind(this)}/>
              </div>
              <div className="col-xs-4">
                <Filter title="Rating"
                        value={this.state.selected_rating}
                        options={this.state.ratings}
                        onChange={this._setRating.bind(this)}/>
              </div>
              <div className="col-xs-4">
                <Filter title="Speed"
                        value={this.state.selected_speed}
                        options={this.state.speeds}
                        onChange={this._setSpeed.bind(this)}/>
              </div>
            </div>
            {restaurants}
        </div>
    )
  }
  _uniqueProperty(arr, property) {
    return ['Any', ...new Set(arr.map(obj => obj[property]))];
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
