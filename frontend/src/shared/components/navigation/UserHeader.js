/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import Header from "./Header";

const UserHeader = () => {
  const logout = () => {
    var c = document.cookie.split("; ");
    for (let i in c)
      document.cookie =
        /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };
  return (
    <Header>
      <li>
        <NavLink to="/user/dashboard">YOUR PROFILE</NavLink>
      </li>
      <li>
        <NavLink to="/user/create-pet">ADD NEW PET</NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={logout}>
          LOGOUT
        </NavLink>
      </li>
    </Header>
  );
};

export default UserHeader;
