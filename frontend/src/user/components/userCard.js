/** @format */

import React from "react";

import "./userCard.css";

const UserCard = (props) => {
  return (
    <div className="user-card-content">
      <div className="name-label">{props.name}</div>
      <div className="name-label">{props.surname}</div>
    </div>
  );
};

export default UserCard;
