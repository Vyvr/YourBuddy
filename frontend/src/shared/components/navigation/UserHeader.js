/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import Header from "./Header";

const UserHeader = () => {
  const logout = () => {
    sessionStorage.clear();
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
