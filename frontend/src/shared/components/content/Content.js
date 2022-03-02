/** @format */

import React from "react";

const Content = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 60px)",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
};

export default Content;
