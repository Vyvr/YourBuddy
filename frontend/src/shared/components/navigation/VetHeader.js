/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Switch from "@mui/material/Switch";

import Header from "./Header";

const VetHeader = () => {
  const history = useHistory();
  const logout = () => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  };

  const onChangeGoUserPage = () => {
    history.push("/user/dashboard");
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
        <NavLink to="/vet/visit-list">VISITS</NavLink>
      </li>
      <li>
        <NavLink to="/vet/clinic-dashboard">CLINIC</NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={logout}>
          LOGOUT
        </NavLink>
      </li>
      <li>
        <Switch onChange={onChangeGoUserPage} defaultChecked={true} />
      </li>
    </Header>
  );
};

export default VetHeader;
