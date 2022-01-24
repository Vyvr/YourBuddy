/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import VetContent from "../../shared/components/content/VetContent";

import "./visitList.css";

const StyledWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const PetInfo = styled.div`
  border: 1px solid black;
  width: 600px;
  height: 100%;
`;

const VisitInfo = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100%;
`;

const VisitDetails = (props) => {
  const location = useLocation();
  const state = location.state;
  const [isLoading, setIsLoading] = useState();
  const [patientDetails, setPatientDetails] = useState();

  useEffect(() => {
    const getPatientDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/pet/get-pet-data/" + state.patient
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setPatientDetails(responseData.existingPet);
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    getPatientDetails();
  }, []);

  return (
    <VetContent>
      {!isLoading && patientDetails && (
        <StyledWrapper>
          <PetInfo>
            <p>{patientDetails.name}</p>
            <p>age: {patientDetails.age}</p>
            <p>Breed: {patientDetails.breed}</p>
            <p>Weight: {patientDetails.weight}</p>
            <p>
              Vaccines:
              {patientDetails.vaccinations.length > 0
                ? patientDetails.vaccinations.map((v) => {
                    return <p>{v}</p>;
                  })
                : ""}
            </p>
          </PetInfo>
          <VisitInfo>Visit info</VisitInfo>
        </StyledWrapper>
      )}

      {/* <table className="visit-list-table">
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
      </table> */}
    </VetContent>
  );
};

export default VisitDetails;
