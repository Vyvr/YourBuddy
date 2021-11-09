/** @format */

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Home from "./home/pages/Home";
import Login from "./home/pages/Login";
import Register from "./home/pages/Register";
import UserProfile from "./user/pages/userProfile";

const App = () => {
  const DUMMY_USERS = [
    {
      id: 1,
      name: "Maciek",
      surname: "Lucinski",
    },
    {
      id: 2,
      name: "Czesiek",
      surname: "Testowy",
    },
    {
      name: "Franklin",
      surname: "Zapasowy",
    },
  ];

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
            <UserProfile items={DUMMY_USERS} />
          </Route>
        </Switch>
      </main>
    </Router>
  );
};

export default App;
