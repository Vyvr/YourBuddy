/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import Header from "./Header";

const VetHeader = () => {
  const logout = () => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
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
        <NavLink to="/vet/clinic-dashboard">CLINIC</NavLink>
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
