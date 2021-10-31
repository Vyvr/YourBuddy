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
          <input
            className="nick-input"
            type="text"
            placeholder="enter your nickname"
          />
        </div>
        <div>
          <input
            className="password-input"
            type="password"
            placeholder="enter your password"
          />
        </div>
        <div className="button-div">
          <button className="login-button">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
