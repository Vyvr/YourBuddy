/** @format */

import React from "react";
import { useHistory } from "react-router-dom";

const Hello = () => {
  const history = useHistory();
  return (
    <div>
      <button onClick={() => history.push("/user/dashboard")}>
        Hello new user!
      </button>
    </div>
  );
};

export default Hello;
