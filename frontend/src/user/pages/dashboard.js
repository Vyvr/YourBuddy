/** @format */

import React, { useEffect, useState } from "react";

import UserContent from "../../shared/components/content/UserContent";
import UserProfile from "./../components/userProfile";
import PetCard from "../../pet/components/petCard";

import "./dashboard.css";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    setName(sessionStorage.getItem("name"));
    setSurname(sessionStorage.getItem("surname"));
  });

  return (
    <div>
      <UserContent>
        <div className="dashboard-content">
          <UserProfile className="user-profile" name={name} surname={surname} />
          <PetCard />
        </div>
      </UserContent>
    </div>
  );
};

export default Dashboard;
