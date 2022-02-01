/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import petProfilePic from "../../resources/pet/pet_profile_pic.jpg";

const PetCard = (props) => {
  return (
    <div className="pet-card-content">
      <img
        src={petProfilePic}
        alt="pet_profile_pic"
        className="pet-profile-picture"
      />
      <div className="pet-name">{props.name}</div>
      <div className="pet-age">{props.age}yo.</div>
      <div className="pet-weight">{props.weight}kg</div>
      <NavLink
        className="edit-pet-button"
        to={{
          pathname: "/user/edit-pet",
          state: {
            id: props.id,
            name: props.name,
            age: props.age,
            weight: props.weight,
          },
        }}
        exact
      >
        EDIT
      </NavLink>
      <br />
      <NavLink
        className="sign-in-to-vet-button"
        to={{
          pathname: "/visit/create",
          state: {
            id: props.id,
            name: props.name,
            age: props.age,
            weight: props.weight,
            owner: props.owner,
          },
        }}
        exact
      >
        Sign in to vet
      </NavLink>
    </div>
  );
};

export default PetCard;
