/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import HeaderLogo from "../HeaderLogo";

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
      <HeaderLogo />
      <div style={{ marginLeft: "auto", marginRight: "auto" }}>
        <NavLink to="/vet/dashboard" style={{ marginLeft: "auto" }}>
          <MenuButton>YOUR PROFILE</MenuButton>
        </NavLink>

        <NavLink to="/vet/visit-list">
          <MenuButton>ALL VISITS</MenuButton>
        </NavLink>

        <NavLink to="/vet/clinic-dashboard">
          <MenuButton>YOUR CLINICS</MenuButton>
        </NavLink>

        <NavLink to="/user/dashboard" style={{ marginRight: "auto" }}>
          <MenuButton>USER PANEL</MenuButton>
        </NavLink>
      </div>
      <NavLink to="/" onClick={logout} style={{ marginLeft: "auto" }}>
        <LogoutButton>LOGOUT</LogoutButton>
      </NavLink>
      {/* <li>
        <NavLink to="/vet/dashboard">YOUR PROFILE</NavLink>
      </li>
      <li>
        <NavLink to="/vet/patients">PATIENTS</NavLink>
      </li>
      <li>
        <NavLink to="/vet/visit-list"> ALL VISITS</NavLink>
      </li>
      <li>
        <NavLink to="/vet/clinic-dashboard">CLINIC</NavLink>
      </li>
      <li>
        <NavLink to="/" onClick={logout}>
          LOGOUT
        </NavLink>
      </li> */}
    </Header>
  );
};

export default VetHeader;
