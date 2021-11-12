/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import Header from "./Header";

const HomeHeader = () => {
  return (
    <Header>
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
        <NavLink to="/user/user-list">USERS LIST</NavLink>
      </li>
    </Header>
  );
};

export default HomeHeader;
