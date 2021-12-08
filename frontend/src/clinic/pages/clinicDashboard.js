/** @format */

import React from "react";
import { NavLink } from "react-router-dom";

import VetContent from "./../../shared/components/content/VetContent";
const ClinicDashboard = () => {
  return (
    <VetContent>
      <NavLink to="/vet/create-clinic">Create clinic</NavLink>
    </VetContent>
  );
};

export default ClinicDashboard;
