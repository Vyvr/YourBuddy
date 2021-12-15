/** @format */

import React from "react";
import { useLocation } from "react-router-dom";

import VetContent from "../../shared/components/content/VetContent";

import "./visitList.css";

const VisitDetails = (props) => {
  const location = useLocation();
  const state = location.state;

  return (
    <VetContent>
      <table className="visit-list-table">
        <thead>
          <tr>
            <th>Owner</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr id={state.id}>
            <td>{state.ownerName}</td>
            <td>{state.patientName}</td>
            <td>{state.term}</td>
            <td>{state.description}</td>
          </tr>
        </tbody>
      </table>
    </VetContent>
  );
};

export default VisitDetails;
