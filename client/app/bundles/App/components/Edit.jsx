import React from 'react'
import $ from 'jquery'
import Filter from './Filter'
import Slider from './Slider'
import {hashHistory, Link} from 'react-router'

class Edit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      name: '',
      selected_genre: null,
      selected_speed: 120,
      selected_rating: null,
      accepts_10bis: false,
      genres: [],
      delivery_time_min: 0,
      delivery_time_max: 120,
      ratings: []
    };
  }
  componentWillMount() {
    let self = this;

    $.get('restaurants/options').done(function(response){
      self.setState({
        genres: response['genre'],
        delivery_time_min: response['delivery_time_min'],
        delivery_time_max: response['delivery_time_max'],
        ratings: response['ratings']
      })
    });

    if (this.props.params.restaurantId) {
      $.get('restaurants/'+this.props.params.restaurantId).done(function(response){
        self.setState({
          name: response['name'],
          selected_genre: response['genre'],
          selected_speed: response['delivery_time'],
          selected_rating: response['rating'],
          accepts_10bis: response['accepts_10bis']
        })
      });
    }
  }
  save(e) {
    e.preventDefault();
    let restaurant = {
      name: this.state.name,
      genre: this.state.selected_genre,
      delivery_time: this.state.selected_speed,
      rating: this.state.selected_rating,
      accepts_10bis: this.state.accepts_10bis
    };
    if (!restaurant.name){
      this.setState({error: 'Name required'});
      return;
    }
    if (!restaurant.genre){
      this.setState({error: 'Please choose cuisine'});
      return;
    }
    if (restaurant.rating === null){
      this.setState({error: 'Please choose rating'});
      return;
    }
    let method = this.props.params.restaurantId ? "PUT" : "POST";
    let restaurantId = this.props.params.restaurantId || '';
    $.ajax({
      type: method,
      contentType: "application/json; charset=utf-8",
      url: 'restaurants/' + restaurantId,
      data: JSON.stringify({restaurant:restaurant}),
      dataType: "json"
    }).done(function(response){
      hashHistory.push('/')
    });
  }
  render() {
    return (
        <div className="new-container">
          <div className="row form">
            <form className="col-xs-12">
              <h3>Submit Restaurant</h3>
              <div className="form-group">
                <label>Restaurant Name</label>
                <input onChange={this._setName.bind(this)} type="text" className="form-control" placeholder="Enter name" value={this.state.name}/>
              </div>
              <Filter title="Cuisine"
                      topOption="Choose one..."
                      topOptionDisabled="true"
                      value={this.state.selected_genre}
                      options={this.state.genres}
                      onChange={this._setGenre.bind(this)} />
              <Filter title="Star Rating"
                      topOption="Choose one..."
                      topOptionDisabled="true"
                      value={this.state.selected_rating}
                      options={this.state.ratings}
                      onChange={this._setRating.bind(this)} />
              <Slider title="Speed"
                      topOption="Choose one..."
                      topOptionDisabled="true"
                      min={this.state.delivery_time_min}
                      max={this.state.delivery_time_max}
                      value={this.state.selected_speed}
                      onChange={this._setSpeed.bind(this)} />
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={this.state.accepts_10bis} onChange={this._set10bis.bind(this)}/> Accepts 10Bis
                </label>
              </div>
              <button className="btn" onClick={this.save.bind(this)}>Save</button>
              <Link to="/">Cancel</Link>
              <p className="error">{this.state.error}</p>
            </form>
          </div>
        </div>
    )
  }
  _setName(e) {
    this.setState({ name: e.target.value })
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
  _set10bis(e) {
    this.setState({ accepts_10bis: e.target.checked ? true : false})
  }
};

export default Edit;
