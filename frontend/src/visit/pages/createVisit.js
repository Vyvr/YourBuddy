/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import UserContent from "../../shared/components/content/UserContent";
import CreateForm from "../../shared/components/forms/createForm";

const CreateVisit = () => {
  const [loadedVets, setLoadedVets] = useState();
  const [isLoading, setIsLoading] = useState();
  let location = useLocation();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/user/get-vets");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedVets(responseData.existingVets);
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  return (
    <UserContent>
      <CreateForm>
        <label className="create-visit-patient-name"></label>
        <div>
          <label>Vet:</label>
          <select>
            {!isLoading &&
              loadedVets &&
              loadedVets.map((vet) => {
                <option value={vet._id}>{vet.name + " " + vet.surname}</option>;
              })}
          </select>
        </div>
      </CreateForm>

      {/* <input defaultValue={location.state.id} />
      <input defaultValue={location.state.name} />
      <input defaultValue={location.state.age} />
      <input defaultValue={location.state.weight} />
      <input defaultValue={location.state.owner} /> */}
    </UserContent>
  );
};

export default CreateVisit;
