/** @format */

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  /**Redirect,*/
  Switch,
} from "react-router-dom";

import Home from "./home/pages/Home";
import Login from "./home/pages/Login";
import Register from "./home/pages/Register";
import UserProfile from "./user/pages/userProfile";

const App = () => {
  return (
    <Router>
      <main>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          <Route path="/user" exact>
            <UserProfile />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
