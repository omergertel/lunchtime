import React from 'react';
import { Link } from 'react-router';
import RestaurantList from './RestaurantList';

function App() {
  return (
    <div className="container">
      <div className="header">
        <Link className="add-button" to="restaurants/new">
          <img src="/assets/add_button.png" alt="add button" />
        </Link>
        <h1 className="logo">EatNow</h1>
        {"Let's find lunch now..."}
      </div>
      <RestaurantList />
    </div>
  );
}

export default App;
