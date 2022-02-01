/** @format */

import React from "react";

import profilePic from "../../resources/user/profile_pic.jpg";

const UserCard = (props) => {
  const deleteUserHandler = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/delete", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          id: props.id,
        }),
      });
      const responseData = await response.json();
      console.log(responseData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="user-card-content">
      <img src={profilePic} alt="profile_pic" className="profile-picture" />
      <div className="name-surname">
        <label className="name-label">{props.name}</label>
        <label className="surname-label">{props.surname}</label>
      </div>
      <button className="delete-user-button" onClick={deleteUserHandler}>
        DELETE
      </button>
    </div>
  );
};

export default UserCard;
