/** @format */

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

import VetContent from "./../../shared/components/content/VetContent";
import ClinicCard from "./../components/clinicCard";
import { COLORS } from "../../shared/colors";

import getCookieValue from "../../scripts/getCookieValue";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  grid-gap: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  width: 100%;
  height: 100%;
`;

const CreateClinicButton = styled.button`
  width: 300px;
  height: 200px;

  cursor: pointer;

  background-color: ${COLORS.menu_button};
  box-shadow: 0 30px 40px rgba(0, 0, 0, 0.2);
  border: none;
  color: ${COLORS.font};
  font-weight: 600;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition: 1s;

  &:hover {
    background-color: ${COLORS.menu_button_hover};
    box-shadow: 0 30px 40px rgba(0, 0, 0, 0.5);
  }
`;

const ClinicDashboard = () => {
  const [loadedClinics, setLoadedClinics] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/clinic/get-all-vet-clinics/" +
            getCookieValue("user_id")
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        if (responseData.clinics.length !== 0) {
          setLoadedClinics(responseData.clinics);
        }
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  return (
    <VetContent>
      <GridWrapper className="clinics-list">
        {!isLoading &&
          loadedClinics &&
          loadedClinics.map((clinic) => {
            return (
              <ClinicCard
                id={clinic.id}
                key={clinic.id}
                name={clinic.name}
                owner={clinic.owner}
                country={clinic.address.country}
                city={clinic.address.city}
                street={clinic.address.street}
                block={clinic.address.block}
                apartment={clinic.address.apartment}
                zipCode={clinic.address.zipCode}
                fromHour={clinic.from.fromHour}
                fromMinutes={clinic.from.fromMinutes}
                toHour={clinic.to.toHour}
                toMinutes={clinic.to.toMinutes}
              />
            );
          })}
        <NavLink to="/vet/create-clinic">
          <CreateClinicButton className="vet-dashboard-create-clinic-button">
            Create clinic
          </CreateClinicButton>
        </NavLink>
      </GridWrapper>
    </VetContent>
  );
};

export default ClinicDashboard;
