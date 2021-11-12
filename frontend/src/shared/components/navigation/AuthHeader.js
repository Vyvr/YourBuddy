/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import Header from "./Header";

const AuthHeader = () => {
  return (
    <Header>
      <li>
        <NavLink to="/">GO BACK</NavLink>
      </li>
    </Header>
  );
};

export default AuthHeader;
