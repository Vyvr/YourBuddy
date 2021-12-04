/** @format */

import React, { useEffect, useState } from "react";

import AuthContent from "../../shared/components/content/AuthContent";
import VetCard from "./../components/vetCard";

import "./vetsList.css";

const VetsList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVets, setLoadedVets] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/vet");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedVets(responseData.vets);
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  return (
    <AuthContent>
      <div className="center">
        <ul>
          {!isLoading &&
            loadedVets &&
            loadedVets.map((vet) => {
              return (
                <VetCard
                  key={vet._id}
                  id={vet._id}
                  name={vet.name}
                  surname={vet.surname}
                />
              );
            })}
        </ul>
      </div>
    </AuthContent>
  );
};

export default VetsList;
