/** @format */

import React from "react";
import styled from "styled-components";

import { COLORS } from "../../../shared/colors";

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    column-gap: 10px;
  }

  & a {
    width: 150px;
    height: 100%;
  }

  & button {
    width: inherit;
    height: 60px;
    border: none;
    cursor: pointer;
    text-align: center;
    background-color: ${COLORS.menu_button};
    color: ${COLORS.font};
    font-size: 16px;
    letter-spacing: 1px;
    font-weight: 700;
    transition: 0.5s;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
  }

  & button:hover {
    background-color: ${COLORS.menu_button_hover};
  }
`;

const ChildrenWrapper = styled.div``;

const Header = (props) => {
  return (
    <Wrapper>
      <ChildrenWrapper>{props.children}</ChildrenWrapper>
    </Wrapper>
  );
};

export default Header;
