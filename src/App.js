import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch, Router } from "react-router-dom";
import createBrowserHistory from "history/createBrowserHistory";

import router from "./router.js";

const history = createBrowserHistory();

const App = () => (
  <Router history={history}>
    <Switch>
      {router.map(route => (
        <Route
          key={route.component}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      ))}
      <Redirect to="/" />
    </Switch>
  </Router>
);

function select(state) {
  return {
    state
  };
}

export default connect(select)(App);
