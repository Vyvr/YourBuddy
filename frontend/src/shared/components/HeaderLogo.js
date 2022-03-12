/** @format */

import React from "react";
import styled from "styled-components";

import { COLORS } from "../colors";

const LogoLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: "Brush Script MT";
  font-size: 30px;
  color: white;
  width: 100%;
`;

const LogoWrapper = styled.div`
  position: absolute;

  height: 60px;
  width: 150px;
  background-color: ${COLORS.font};

  border-radius: 0px;
  border-top-right-radius: 30px;
`;

const HeaderLogo = () => {
  return (
    <LogoWrapper>
      <LogoLabel>Your Buddy</LogoLabel>
    </LogoWrapper>
  );
};

export default HeaderLogo;
