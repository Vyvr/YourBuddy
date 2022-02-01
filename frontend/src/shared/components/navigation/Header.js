/** @format */

import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  background-color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);

  & div {
    display: flex;
    justify-content: right;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  & a {
    margin-left: 10px;
    width: 150px;
    height: 100%;
  }

  & button {
    width: inherit;
    height: 60px;
    border: none;
    cursor: pointer;
    text-align: center;
    background-color: white;
    color: #388087;
    font-weight: 700;
    transition: 0.5s;
  }

  & button:hover {
    background-color: #e3e3de;
  }
`;

const Header = (props) => {
  return (
    <Wrapper>
      <div>{props.children}</div>
    </Wrapper>
  );
};

export default Header;
