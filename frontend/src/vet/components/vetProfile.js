/** @format */

import React from "react";

import profilePic from "../../resources/user/profile_pic.jpg";

import "./vetProfile.css";

const UserProfile = (props) => {
  return (
    <div className="vet-profile-content">
      <div className="vet-profile-picture-wrapper">
        <img
          src={profilePic}
          alt="profile_pic"
          className="vet-profile-picture"
        />
      </div>
      <div className="vet-profile-name-surname">
        <div className="vet-name-label">{props.name}</div>
        <div className="vet-surname-label">{props.surname}</div>
      </div>
    </div>
  );
};

export default UserProfile;
