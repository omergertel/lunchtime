import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Index from './Index'
import Edit from './Edit'

class Routing extends React.Component{
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path="restaurants/new" component={Edit}/>
        <Route path="restaurants/:restaurantId/edit" component={Edit}/>
      </Router>
    )
  }
};

export default Routing;
