/** @format */

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

import UserContent from "../../shared/components/content/UserContent";
import CreateForm from "../../shared/components/forms/createForm";

import "./createVisit.css";

const CreateVisit = () => {
  const [loadedVets, setLoadedVets] = useState();
  const [loadedClinics, setLoadedClinics] = useState();
  const [isLoading, setIsLoading] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const { register, handleSubmit, setValue } = useForm();
  let location = useLocation();
  let clinicId;

  useEffect(() => {
    const getAllClinics = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/clinic/get-all-clinics"
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedClinics(responseData.clinics);
        setSelectedOption(responseData.clinics[0].id);
        getAllClinicVets(responseData.clinics[0].id);
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    getAllClinics();
  }, []);

  const createVisitSubmitHandler = async (data) => {
    const date = data.date;
    const vet = data.vet;
    const patient = location.state.id;
    const owner = location.state.owner;
  };

  const getAllClinicVets = async (clinicId) => {
    setIsLoading(true);
    setSelectedOption(clinicId);
    try {
      const response = await fetch(
        "http://localhost:5000/api/clinic/get-all-clinic-vets/" + clinicId
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      setLoadedVets(responseData.workers);
      console.log(responseData.workers);
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
          <label>Clinic:</label>
          <select
            value={selectedOption}
            onChange={(event) => getAllClinicVets(event.target.value)}
          >
            {!isLoading &&
              loadedClinics &&
              loadedClinics.map((clinic) => {
                return (
                  <option
                    key={clinic._id}
                    value={clinic._id}
                    onSubmit={setValue("clinic", clinic._id)}
                  >
                    {clinic.name +
                      " " +
                      clinic.address.city +
                      " " +
                      clinic.address.street +
                      " " +
                      clinic.address.block}{" "}
                    {clinic.address.apartment ? "/" : ""}{" "}
                    {clinic.address.apartment}
                  </option>
                );
              })}
          </select>
        </div>
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
