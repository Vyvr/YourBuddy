/** @format */

import React from "react";

import profilePic from "../../resources/user/profile_pic.jpg";

import "./userCard.css";

const UserCard = (props) => {
  return (
    <div className="user-card-content">
      <img src={profilePic} alt="profile_pic" className="profile-picture" />
      <div className="name-surname">
        <label className="name-label">{props.name}</label>
        <label className="surname-label">{props.surname}</label>
      </div>
    </div>
  );
};

export default UserCard;
