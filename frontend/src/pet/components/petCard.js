/** @format */

import React from "react";

import petProfilePic from "../../resources/pet/pet_profile_pic.jpg";

import "./petCard.css";

const PetCard = (props) => {
  return (
    <div className="pet-card-content">
      <img
        src={petProfilePic}
        alt="pet_profile_pic"
        className="pet-profile-picture"
      />
      <div className="pet-name">Burek</div>
      <div className="pet-age">age: 3</div>
      <div className="pet-weight">weight: 5kg</div>
    </div>
  );
};

export default PetCard;
