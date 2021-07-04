import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import ListProducts from './components/pages/ListProducts';
import ManageProducts from './components/pages/ManageProducts';


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/list" component={ListProducts}></Route>
        <Route path="/manage" component={ManageProducts}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
