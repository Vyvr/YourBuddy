/** @format */

import React, { useEffect, useState } from "react";

import NotLoggedIn from "../../shared/pages/notLoggedIn";
import VetContent from "../../shared/components/content/VetContent";
import VetProfile from "./../components/vetProfile";

import getCookieValue from "./../../scripts/getCookieValue";

import "./dashboard.css";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    setName(getCookieValue("name"));
    setSurname(getCookieValue("surname"));
  }, []);

  if (getCookieValue("loggedIn") !== "true") {
    return <NotLoggedIn />;
  }

  return (
    <div>
      <VetContent>
        <div className="vet-dashboard-content">
          <VetProfile className="vet-profile" name={name} surname={surname} />
        </div>
      </VetContent>
    </div>
  );
};

export default Dashboard;
