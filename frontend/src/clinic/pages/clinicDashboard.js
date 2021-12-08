/** @format */

import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import VetContent from "./../../shared/components/content/VetContent";
import ClinicCard from "./../components/clinicCard";

import getCookieValue from "../../scripts/getCookieValue";

import "./clinicDashboard.css";

const ClinicDashboard = () => {
  const [loadedClinics, setLoadedClinics] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/clinic/get-all-vet-clinics/" +
            getCookieValue("vetId")
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
      <div className="clinics-list">
        {!isLoading &&
          loadedClinics &&
          loadedClinics.map((clinic) => {
            console.log(clinic);
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
          <button className="vet-dashboard-create-clinic-button">
            Create clinic
          </button>
        </NavLink>
      </div>
    </VetContent>
  );
};

export default ClinicDashboard;
