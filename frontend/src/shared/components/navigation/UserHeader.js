/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Switch from "@mui/material/Switch";
import styled from "styled-components";

import Header from "./Header";
import getCookieValue from "../../../scripts/getCookieValue";

const MenuButton = styled.button`
  && {
  }
`;

const LogoutButton = styled.button`
  && {
    height: 60px;
    width: 150px;
    border: none;
    cursor: pointer;
    background-color: #fd6769;
    color: white;
    font-weight: 700;
    transition: 0.5s;
    border-radius: 0px;
    border-top-left-radius: 30px;
    &:hover {
      background-color: #d45759;
    }
  }
`;

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
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <NavLink to="/user/dashboard" style={{ marginLeft: "auto" }}>
          <MenuButton>YOUR PROFILE</MenuButton>
        </NavLink>
        <NavLink to="/user/create-pet" style={{ marginRight: "auto" }}>
          <MenuButton>NEW PET</MenuButton>
        </NavLink>
      </div>
      <NavLink to="/" onClick={logout} style={{ marginLeft: "auto" }}>
        <LogoutButton>LOGOUT</LogoutButton>
      </NavLink>

      {/* {getCookieValue("isVet") === "true" && (
        <li>
          <Switch onChange={onChangeGoVetPage} />
        </li>
      )} */}

      {/* <li>
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
      {getCookieValue("isVet") === "true" && (
        <li>
          <Switch onChange={onChangeGoVetPage} />
        </li>
      )} */}
    </Header>
  );
};

export default UserHeader;
