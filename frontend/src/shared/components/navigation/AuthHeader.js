/** @format */

import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderLogo from '../HeaderLogo';

import Header from './Header';

const AuthHeader = () => {
  return (
    <Header>
      <NavLink
        to="/"
        style={{ marginLeft: 'auto', marginRight: 'auto' }}
      >
        <button>GO BACK</button>
      </NavLink>
    </Header>
  );
};

export default AuthHeader;
