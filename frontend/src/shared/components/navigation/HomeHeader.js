/** @format */

import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import HeaderLogo from '../HeaderLogo';

import Header from './Header';
import { COLORS } from '../../../shared/colors';

const RegisterButton = styled.button`
  && {
    background-color: ${COLORS.special_button};
    border-radius: 0px;
    border-top-left-radius: 30px;

    :hover {
      background-color: ${COLORS.special_button_hover};
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
      <HeaderLogo />
      <NavLink to="/login" style={{ marginLeft: 'auto' }}>
        <LoginButton>LOGIN</LoginButton>
      </NavLink>
      <NavLink to="/register">
        <RegisterButton>REGISTER</RegisterButton>
      </NavLink>
    </Header>
  );
};

export default HomeHeader;
