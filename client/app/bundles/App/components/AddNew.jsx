import React from 'react'
import $ from 'jquery'
import AddNewFilter from './AddNewFilter'
import {hashHistory, Link} from 'react-router'

class AddNew extends React.Component{
  constructor(props) {
    super();
    this.state = {
      error: '',
      selected_genre: '',
      selected_speed: '',
      selected_rating: '',
      genres: [],
      speeds: [],
      ratings: []
    };
  }
  componentWillMount() {
    let _this = this
    $.get('restaurants/options').done(function(response){
      _this.setState({
        genres: response['genre'],
        speeds: response['delivery_times'],
        ratings: response['ratings']
      })
    })
  }
  save(e) {
    e.preventDefault();
    let restaurant = {
      name: this.name.value,
      genre: this.state.selected_genre,
      delivery_time: this.state.selected_speed,
      rating: this.state.selected_rating,
      accepts_10bis: this.accepts_10bis.checked ? true : false
    };
    if (!restaurant.name){
      this.setState({error: 'Name required'});
      return;
    }
    if (!restaurant.genre){
      this.setState({error: 'Please choose cuisine'});
      return;
    }
    if (!restaurant.delivery_time){
      this.setState({error: 'Please choose speed'});
      return;
    }
    if (!restaurant.rating){
      this.setState({error: 'Please choose rating'});
      return;
    }
    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: 'restaurants/',
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
                <input ref={(input) => this.name = input} type="text" className="form-control" placeholder="Enter name" />
              </div>
              <AddNewFilter title="Cuisine" options={this.state.genres} onChange={this._setGenre.bind(this)} />
              <AddNewFilter title="Speed" options={this.state.speeds} onChange={this._setSpeed.bind(this)} />
              <AddNewFilter title="Rating" options={this.state.ratings} onChange={this._setRating.bind(this)} />
              <div className="checkbox">
                <label>
                  <input type="checkbox" ref={(input) => this.accepts_10bis = input} /> Accepts 10Bis
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

export default AddNew;
