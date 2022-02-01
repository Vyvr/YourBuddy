/** @format */

import React from "react";
import { useHistory } from "react-router-dom";

const NotLoggedIn = () => {
  const history = useHistory();
  return (
    <div className="nl-content">
      <div className="not-logged-in-center">
        <div className="text-box-div">Oops. Seems you're not logged in!</div>
        <div className="text-box-div">Please login in home page!</div>
        <button className="nl-button" onClick={() => history.push("/")}>
          Go back!
        </button>
      </div>
    </div>
  );
};

export default NotLoggedIn;
