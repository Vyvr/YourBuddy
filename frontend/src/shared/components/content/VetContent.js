/** @format */

import React from "react";

import VetHeader from "../navigation/VetHeader";

import Content from "./Content";

const UserContent = (props) => {
  return (
    <React.Fragment>
      <VetHeader />
      <Content>{props.children}</Content>
    </React.Fragment>
  );
};

export default UserContent;
