import React from 'react';
import { Route, Redirect, Switch, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import Index from './views/index/index';
import Post from './views/post/post';

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Switch>
      <Route
        path="/"
        component={Index}
        exact
      />
      <Route
        path="/post/:id"
        component={Post}
      />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;
