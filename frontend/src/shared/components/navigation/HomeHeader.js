/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";

const RegisterButton = styled.button`
  && {
    background-color: #badfe7;
    border-top-left-radius: 30px;

    :hover {
      background-color: #6fb3b8;
      color: white;
    }
  }
`;

const LoginButton = styled.button`
  && {
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
  }
`;

const HomeHeader = () => {
  return (
    <Header>
      <NavLink to="/user/user-list">
        <button>USERS LIST</button>
      </NavLink>
      <div>
        <NavLink to="/login">
          <LoginButton>LOGIN</LoginButton>
        </NavLink>
        <NavLink to="/register">
          <RegisterButton>REGISTER</RegisterButton>
        </NavLink>
      </div>
    </Header>
  );
};

export default HomeHeader;
