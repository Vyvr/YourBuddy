/** @format */

import React from "react";

import profilePic from "../../resources/user/profile_pic.jpg";

import "./userProfile.css";

const UserProfile = (props) => {
  return (
    <div className="user-profile-content">
      <div className="profile-picture-wrapper">
        <img
          src={profilePic}
          alt="profile_pic"
          className="user-profile-picture"
        />
      </div>
      <div className="profile-name-surname">
        <div className="name-label">{props.name}</div>
        <div className="surname-label">{props.surname}</div>
      </div>
    </div>
  );
};

export default UserProfile;
