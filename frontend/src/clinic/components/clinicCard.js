/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import "./clinicCard.css";

const clinicCard = (props) => {
  return (
    <div className="clinic-card-content">
      <div className="clinic-name-div">{props.name}</div>
      <div className="clinic-address-div">
        {props.city}, {props.street} {props.block}
        {props.apartment ? "/" : ""}
        {props.apartment}
      </div>
      <NavLink
        className="edit-clinic-button"
        to={{
          pathname: "/vet/edit-clinic",
          state: {
            name: props.name,
            owner: props.owner,
            country: props.country,
            city: props.city,
            street: props.street,
            block: props.block,
            apartment: props.apartment,
            zipCode: props.zipCode,
            fromHour: props.fromHour,
            fromMinutes: props.fromMinutes,
            toHour: props.toHour,
            toMinutes: props.toMinutes,
          },
        }}
        exact
      >
        EDIT
      </NavLink>
      <br />
      <NavLink
        className="add-worker-button"
        to={{
          pathname: "/vet/add-worker",
          state: {
            id: props.id,
          },
        }}
        exact
      >
        Add worker
      </NavLink>
    </div>
  );
};

export default clinicCard;
