/** @format */

import React from "react";

const Content = (props) => {
  return (
    <div
      style={{
        height: "auto",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
};

export default Content;
