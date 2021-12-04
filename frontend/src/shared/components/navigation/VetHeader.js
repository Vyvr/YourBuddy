/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import Header from "./Header";

const VetHeader = () => {
  const logout = () => {
    var c = document.cookie.split("; ");
    for (let i in c)
      document.cookie =
        /^[^=]+/.exec(c[i])[0] + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  };
  return (
    <Header>
      <li>
        <NavLink to="/vet/dashboard">YOUR PROFILE</NavLink>
      </li>
      <li>
        <NavLink to="/vet/patients">PATIENTS</NavLink>
      </li>
      <li>
        <NavLink to="/vet/visits">VISITS</NavLink>
      </li>
      <li>
        <NavLink to="/vet/clinic">CLINIC</NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={logout}>
          LOGOUT
        </NavLink>
      </li>
    </Header>
  );
};

export default VetHeader;
