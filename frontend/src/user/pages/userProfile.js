/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import Header from "../../shared/components/navigation/HomeHeader";
import UserCard from "../components/userCard";

import "./userProfile.css";

const UserProfile = (props) => {
  return (
    <div>
      <Header>
        <ul>
          <li>
            <NavLink to="/">BACK</NavLink>
          </li>
        </ul>
      </Header>
      <div className="center">
        <ul>
          {props.items.map((user) => {
            return (
              <UserCard key={user.id} name={user.name} surname={user.surname} />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
