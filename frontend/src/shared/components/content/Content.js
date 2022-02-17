/** @format */

import React from "react";

const Content = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "auto",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
};

export default Content;
