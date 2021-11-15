/** @format */

import React from "react";

import UserContent from "../../shared/components/content/UserContent";
import UserCard from "./../components/userCard";
import SessionStorage from "./../../scripts/sessionStorage";

import "./dashboard.css";

const Dashboard = () => {
  const getCredentials = () => {
    const sessionStorage = SessionStorage;
    console.log(
      sessionStorage.getItem(name),
      sessionStorage.getItem("surname")
    );
  };
  const name = sessionStorage.getItem("name");
  const surname = sessionStorage.getItem("surname");

  console.log(name, surname);
  return (
    <div>
      <UserContent>
        <div className="dashboard-content">
          <UserCard className="user-profile" name={name} surname={surname} />
          <div className="user-pets"></div>
          <button onClick={getCredentials} />
        </div>
      </UserContent>
    </div>
  );
};

export default Dashboard;
