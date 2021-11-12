/** @format */

import React from "react";

import Content from "./Content";
import HomeHeader from "../navigation/HomeHeader";

const HomeContent = (props) => {
  return (
    <React.Fragment>
      <HomeHeader />
      <Content>{props.children}</Content>
    </React.Fragment>
  );
};

export default HomeContent;
