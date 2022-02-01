/** @format */

import React from "react";

const Home = (props) => {
  return (
    <div className="home-header-content">
      <ul className="home-nav-links">{props.children}</ul>
    </div>
  );
};

export default Home;
