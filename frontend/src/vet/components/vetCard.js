/** @format */

import React from "react";

import profilePic from "../../resources/user/profile_pic.jpg";

import "./vetCard.css";

const VetCard = (props) => {
  const deleteVetHandler = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/vet/delete-vet-with-clinics",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },

          body: JSON.stringify({
            id: props.id,
          }),
        }
      );
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
      <button className="delete-user-button" onClick={deleteVetHandler}>
        DELETE
      </button>
    </div>
  );
};

export default VetCard;
