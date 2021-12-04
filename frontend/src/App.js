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
import UserDashboard from "./user/pages/dashboard";
import VetDashboard from "./vet/pages/dashboard";
import CreatePet from "./pet/pages/createPet";
import EditPet from "./pet/pages/editPet";
import Hello from "./user/pages/hello";

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
            <UserDashboard />
          </Route>
          <Route path="/vet/dashboard" exact>
            <VetDashboard />
          </Route>
          <Route path="/user/create-pet" exact>
            <CreatePet />
          </Route>
          <Route path="/user/edit-pet" exact>
            <EditPet />
          </Route>
          <Route path="/user/user-list" exact>
            <UsersList />
          </Route>
          <Route path="/user/hello" exact>
            <Hello />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
