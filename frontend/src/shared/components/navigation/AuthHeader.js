/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import Header from "./Header";

const AuthHeader = () => {
  return (
    <Header>
      <NavLink to="/">
        <button>GO BACK</button>
      </NavLink>
    </Header>
  );
};

export default AuthHeader;
