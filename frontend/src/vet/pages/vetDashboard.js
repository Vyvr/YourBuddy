/** @format */

import React, { useEffect, useState } from "react";

import NotLoggedIn from "../../shared/pages/notLoggedIn";
import VetContent from "../../shared/components/content/VetContent";
import VetProfile from "../components/vetProfile";

import getCookieValue from "../../scripts/getCookieValue";

import "./vetDashboard.css";

const VetDashboard = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    setName(getCookieValue("vetName"));
    setSurname(getCookieValue("vetSurname"));
  }, []);

  if (
    getCookieValue("vetLoggedIn") !== "true" ||
    getCookieValue("loggedInAs") === "user"
  ) {
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

export default VetDashboard;
