/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Switch from "@mui/material/Switch";

import Header from "./Header";

const UserHeader = () => {
  const history = useHistory();
  const logout = () => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
  };

  const onChangeGoVetPage = () => {
    history.push("/vet/dashboard");
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
      <li>
        <Switch onChange={onChangeGoVetPage} />
      </li>
    </Header>
  );
};

export default UserHeader;
