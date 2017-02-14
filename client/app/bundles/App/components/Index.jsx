import React from 'react'
import { Link } from 'react-router'
import RestaurantList from './RestaurantList'

class App extends React.Component{
  render() {
    return (
        <div className="container">
          <div className="header">
            <Link className="add-button" to="/new">
              <img src="assets/add_button.png"></img>
            </Link>
            <h1 className="logo">EatNow</h1>
            Let's find lunch now...
          </div>
          <RestaurantList />
        </div>
    )
  }
};

export default App;
