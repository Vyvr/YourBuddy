/** @format */

import React, { useEffect, useState } from "react";

import VetContent from "../../shared/components/content/VetContent";
import VetProfile from "../components/vetProfile";

import getCookieValue from "../../scripts/getCookieValue";

import "./vetDashboard.css";

const VetDashboard = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  useEffect(() => {
    setName(getCookieValue("userName"));
    setSurname(getCookieValue("userSurname"));
  }, []);

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
