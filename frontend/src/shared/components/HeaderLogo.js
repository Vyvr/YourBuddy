/** @format */

import React from "react";
import styled from "styled-components";

import { COLORS } from "../colors";

const LogoLabel = styled.label`
  /* display: flex;
  align-items: center;
  justify-content: center; */

  font-family: "Brush Script MT";
  font-size: 30px;
  color: white;
  height: 60px;
  width: 150px;
`;

const LogoWrapper = styled.button`
  /* position: relative; */
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

  /* && {
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
    } */
`;

const HeaderLogo = () => {
  return (
    <LogoWrapper>
      <LogoLabel>Your Buddy</LogoLabel>
    </LogoWrapper>
  );
};

export default HeaderLogo;
