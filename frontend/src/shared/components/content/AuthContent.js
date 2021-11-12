/** @format */

import React from "react";

import AuthHeader from "../navigation/AuthHeader";

import Content from "./Content";

const AuthContent = (props) => {
  return (
    <React.Fragment>
      <AuthHeader />
      <Content>{props.children}</Content>
    </React.Fragment>
  );
};

export default AuthContent;
