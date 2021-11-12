/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import UserContent from "../../shared/components/content/UserContent";

import "./dashboard.css";

const Dashboard = () => {
  return (
    <div>
      <UserContent>
        <div className="dashboard-content">
          <div className="user-profile"></div>
          <div className="user-pets"></div>
        </div>
      </UserContent>
    </div>
  );
};

export default Dashboard;
