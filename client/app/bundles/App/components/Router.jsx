import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import Index from './Index'
import AddNew from './AddNew'

class Routing extends React.Component{
  render() {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Index}/>
        <Route path="/new" component={AddNew}/>
      </Router>
    )
  }
};

export default Routing;
