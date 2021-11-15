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
import UsersList from "./user/pages/usersList";
import Dashboard from "./user/pages/dashboard";
import CreatePet from "./user/pages/createPet";

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
          <Route path="/user/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/user/create-pet" exact>
            <CreatePet />
          </Route>
          <Route path="/user/user-list" exact>
            <UsersList />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
