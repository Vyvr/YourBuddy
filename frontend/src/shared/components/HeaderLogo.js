/** @format */

import React from "react";
import styled from "styled-components";

import { COLORS } from "../colors";

const LogoLabel = styled.label`
  font-family: "Brush Script MT";
  font-size: 30px;
  color: white;
  height: 60px;
  width: 150px;
`;

const LogoWrapper = styled.button`
  && {
    height: 60px;
    width: 150px;
    background-color: ${COLORS.font};
    font-weight: normal;

    border-radius: 0px;
    border-top-right-radius: 30px;
    cursor: pointer;

    &:hover {
      background-color: ${COLORS.font};
    }
  }
`;

const HeaderLogo = () => {
  return (
    <LogoWrapper>
      <LogoLabel>Your Buddy</LogoLabel>
    </LogoWrapper>
  );
};

export default HeaderLogo;
