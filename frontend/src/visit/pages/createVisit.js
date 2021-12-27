/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import UserContent from "../../shared/components/content/UserContent";
import CreateForm from "../../shared/components/forms/createForm";

import "./createVisit.css";

const CreateVisit = () => {
  const [loadedVets, setLoadedVets] = useState();
  const [isLoading, setIsLoading] = useState();
  const { register, handleSubmit, setValue } = useForm();
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

  const createVisitSubmitHandler = async (data) => {
    const date = data.date;
    const vet = data.vet;
    const patient = location.state.id;
    const owner = location.state.owner;

    console.log(date + " " + vet + " " + patient + " " + owner);
  };

  const getVetClinics = async (vetId) => {
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

  return (
    <UserContent>
      <CreateForm>
        <label className="create-visit-patient-name">
          {location.state.name}
        </label>
        <div className="components-div">
          <label>Vet:</label>
          <select>
            {!isLoading &&
              loadedVets &&
              loadedVets.map((vet) => {
                return (
                  <option key={vet._id} onSubmit={setValue("vet", vet._id)}>
                    {vet.name + " " + vet.surname}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="components-div">
          <label>Clinic:</label>
          <select onChange={() => getVetClinics()}>
            {!isLoading &&
              loadedVets &&
              loadedVets.map((vet) => {
                return (
                  <option key={vet._id} onSubmit={setValue("vet", vet._id)}>
                    {vet.name + " " + vet.surname}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="components-div">
          <label>Date: </label>
          <input type="date" {...register("date")} />
        </div>

        <div className="button-div">
          <button
            type="submit"
            onClick={handleSubmit(createVisitSubmitHandler)}
          >
            Create clinic
          </button>
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
