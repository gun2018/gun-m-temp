import React from 'react';
import { Route, Redirect, Switch, Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'

import router from './router.js'

const history = createBrowserHistory()

const App = () => (
  <Router history={history}>
    <Switch>
      {router.map(route => (
        <Route
          key={route.component}
          path={route.path}
          component={route.component}
          exect={route.exact}
        />
      ))}
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;
