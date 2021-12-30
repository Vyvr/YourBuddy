/** @format */

import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";

import UserContent from "../../shared/components/content/UserContent";
import CreateForm from "../../shared/components/forms/createForm";

import "./createVisit.css";

const StyledTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border: 1px solid black;
  border-collapse: collapse;
`

const CreateVisit = () => {
    const [loadedVets, setLoadedVets] = useState();
    const [loadedClinics, setLoadedClinics] = useState();
    const [clinicId, setClinicId] = useState();
    const [vetId, setVetId] = useState();
    const [loadedVisits, setLoadedVisits] = useState();
    const [isLoading, setIsLoading] = useState();
    const [selectedOption, setSelectedOption] = useState();
    const [correctData, setCorrectData] = useState(true);
    const {register, handleSubmit, setValue} = useForm();
    let location = useLocation();


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

                if (responseData.clinics[0]) {
                    setSelectedOption(responseData.clinics[0].id);
                    setClinicId(responseData.clinics[0].id);
                    getAllClinicVets(responseData.clinics[0].id);
                } else {
                    setSelectedOption(null);
                    setClinicId(null);

                }
                getPetVisits()
            } catch (err) {
                throw new Error(err.message);
            }
            setIsLoading(false);
        };
        getAllClinics();
    }, []);

    const getPetVisits = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                "http://localhost:5000/api/visit/get-patient-visits/" + location.state.id
            );
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }

            if (responseData.visits.length !== 0) {
                setLoadedVisits(responseData.visits);
            }
        } catch (err) {
            throw new Error(err.message);
        }
        setIsLoading(false);
    };

    const getAllClinicVets = async (clinicId) => {
        setIsLoading(true);
        setSelectedOption(clinicId);
        setClinicId(clinicId)
        try {
            const response = await fetch(
                "http://localhost:5000/api/clinic/get-all-clinic-vets/" + clinicId
            );
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
            setLoadedVets(responseData.workers);

            if (!responseData.workers[0]) {
                setVetId(null)
            } else {
                setVetId(responseData.workers[0]._id);
            }
        } catch (err) {
            throw new Error(err.message);
        }
        setIsLoading(false);
    };

    const handleVetChange = (data) => {
        setVetId(data)
    }

    const createVisitSubmitHandler = async (data) => {
        const date = data.date;
        const vet = vetId;
        const patient = location.state.id;
        const owner = location.state.owner;

        if (!date || !vet || !patient || !owner) {
            setCorrectData(false)
            return;
        }
        setIsLoading(true)
        try {
            const response = await fetch(
                "http://localhost:5000/api/visit/create-visit",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({
                        term: date,
                        vetId: vet,
                        patientId: patient,
                        patientOwnerId: owner,
                        clinicId: clinicId
                    }),
                }
            );
            const responseData = await response.json();
            if (!response.ok) {
                throw new Error(responseData.message);
            }
        } catch (err) {
            console.log(err);
        }
        setCorrectData(true);
        setIsLoading(false);

        window.location.reload(false);
    };

    return (
        <UserContent>
            <div>
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
                        <select

                            onChange={(event) => handleVetChange(event.target.value)}
                        >
                            {!isLoading &&
                            loadedVets &&
                            loadedVets.map((vet) => {
                                return (
                                    <option
                                        key={vet._id}
                                        value={vet._id}
                                        onSubmit={setValue("vet", vet._id)}>
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
                            Create visit
                        </button>
                        {!correctData ? <label>Uncorrect data passed</label> : null}
                    </div>
                </CreateForm>
            </div>
            <div>
                <StyledTable>
                    <thead>
                    <tr>
                        <th>Vet</th>
                        <th>Description</th>
                        <th>Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!isLoading &&
                    loadedVisits?.map((v) => {
                        return (
                            <tr
                                key={v.id}
                                id={v.id}
                            >
                                <td>{v.vetName}</td>
                                <td>{v.description}</td>
                                <td>{v.term}</td>
                            </tr>
                        );
                    }).reverse()}
                    </tbody>
                </StyledTable>
            </div>
        </UserContent>
    );
};

export default CreateVisit;
