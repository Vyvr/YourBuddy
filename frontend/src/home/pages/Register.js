/** @format */

import React from "react";

import HomeHeader from "../../shared/components/navigation/HomeHeader";
import { NavLink } from "react-router-dom";

import "./Login.css";

const Login = () => {
  return (
    <div className="login-content">
      <HomeHeader>
        <ul className="login-nav-links">
          <li>
            <NavLink to="/">GO BACK</NavLink>
          </li>
        </ul>
      </HomeHeader>
      <div className="login-form">
        <div>
          <input className="nick-input" type="text" placeholder="name" />
        </div>
        <div>
          <input className="password-input" type="text" placeholder="surname" />
        </div>
        <div>
          <input className="password-input" type="text" placeholder="mail" />
        </div>
        <div>
          <input
            className="password-input"
            type="password"
            placeholder="password"
          />
        </div>
        <div className="button-div">
          <button className="login-button" type="submit">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
