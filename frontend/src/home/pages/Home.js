/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import HomeHeader from "../../shared/components/navigation/HomeHeader";

import "./Home.css";

const Home = () => {
  return (
    <div className="home-content">
      <HomeHeader>
        <ul className="home-nav-links">
          <li>
            <NavLink to="/login">LOGIN</NavLink>
          </li>
          <li>
            <NavLink to="/register">REGISTER</NavLink>
          </li>
          <li>
            <NavLink to="/">ABOUT</NavLink>
          </li>
          <li>
            <NavLink to="/user">USER PROFILES</NavLink>
          </li>
        </ul>
      </HomeHeader>
    </div>
  );
};

export default Home;
