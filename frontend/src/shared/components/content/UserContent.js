/** @format */

import React from "react";

import UserHeader from "../navigation/UserHeader";

import Content from "./Content";

const UserContent = (props) => {
  return (
    <React.Fragment>
      <UserHeader />
      <Content>{props.children}</Content>
    </React.Fragment>
  );
};

export default UserContent;
