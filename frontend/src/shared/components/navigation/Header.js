/** @format */

import React from "react";

import "./Header.css";

const Home = (props) => {
  return (
    <div className="home-header-content">
      <ul className="home-nav-links">{props.children}</ul>
    </div>
  );
};

export default Home;
