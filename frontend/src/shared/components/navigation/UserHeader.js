/** @format */

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import HeaderLogo from "../HeaderLogo";
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

const ButtonsWrapper = styled.div``;

const UserHeader = () => {
  const [isVet, setIsVet] = useState(false);

  useEffect(() => {
    const isVetHandler = () => {
      if (getCookieValue("isVet") === "true") setIsVet(true);
    };
    isVetHandler();
  }, []);

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
      <ButtonsWrapper>
        <NavLink to="/user/dashboard" style={{ marginLeft: "auto" }}>
          <MenuButton>YOUR PROFILE</MenuButton>
        </NavLink>
        <NavLink
          to="/user/create-pet"
          style={{ marginRight: isVet ? "0px" : "auto" }}
        >
          <MenuButton>NEW PET</MenuButton>
        </NavLink>
        {isVet === true && (
          <NavLink to="/vet/dashboard" style={{ marginRight: "auto" }}>
            <MenuButton>VET PANEL</MenuButton>
          </NavLink>
        )}
      </ButtonsWrapper>
      <NavLink to="/" onClick={logout}>
        <LogoutButton>LOGOUT</LogoutButton>
      </NavLink>
    </Header>
  );
};

export default UserHeader;
