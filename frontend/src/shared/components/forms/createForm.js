/** @format */

import React from "react";

const Form = (props) => {
  return (
    <form>
      <div className="form-content">{props.children}</div>
    </form>
  );
};

export default Form;
