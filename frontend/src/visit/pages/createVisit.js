/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { COLORS } from "../../shared/colors";

import UserContent from "../../shared/components/content/UserContent";

import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonWrapper,
  LoginButton,
  DeleteButton,
  ErrorLabel,
  Select,
} from "../../shared/components/forms/formTemplate";

import { Table, Thead, Tr } from "../../shared/components/table/tableTemplate";

const StyledNameLabel = styled.label`
  color: ${COLORS.special_button_font};
  font-weight: bold;
  align-self: center;
  font-size: 1.3rem;
  cursor: text;
  margin-bottom: 16px;
`;

const NameWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 30%;
  align-items: center;
`;

const CreateVisit = () => {
  const [loadedVets, setLoadedVets] = useState();
  const [loadedClinics, setLoadedClinics] = useState();
  const [clinicId, setClinicId] = useState();
  const [vetId, setVetId] = useState();
  const [loadedVisits, setLoadedVisits] = useState();
  const [isLoading, setIsLoading] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [correctData, setCorrectData] = useState(true);
  const { register, handleSubmit, setValue } = useForm();
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
        getPetVisits();
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
        "http://localhost:5000/api/visit/get-patient-visits/" +
          location.state.id
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
    setClinicId(clinicId);
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
        setVetId(null);
      } else {
        setVetId(responseData.workers[0]._id);
      }
    } catch (err) {
      throw new Error(err.message);
    }
    setIsLoading(false);
  };

  const handleVetChange = (data) => {
    setVetId(data);
  };

  const createVisitSubmitHandler = async (data) => {
    const date = data.date;
    const vet = vetId;
    const patient = location.state.id;
    const owner = location.state.owner;

    if (!date || !vet || !patient || !owner) {
      setCorrectData(false);
      return;
    }
    setIsLoading(true);
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
            clinicId: clinicId,
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
      <Form>
        <NameWrapper className="form__group">
          <StyledNameLabel className="form__label">
            Create visit for {location.state.name}
          </StyledNameLabel>
        </NameWrapper>

        <FormGroup>
          <Select
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
          </Select>
          <FormLabel>Clinic:</FormLabel>
        </FormGroup>

        <FormGroup>
          <Select onChange={(event) => handleVetChange(event.target.value)}>
            {!isLoading &&
              loadedVets &&
              loadedVets.map((vet) => {
                return (
                  <option
                    key={vet._id}
                    value={vet._id}
                    onSubmit={setValue("vet", vet._id)}
                  >
                    {vet.name + " " + vet.surname}
                  </option>
                );
              })}
          </Select>
          <FormLabel>Doctor:</FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="date"
            className="form__field"
            placeholder="Date"
            name="date"
            id="date"
            {...register("date")}
          />
          <FormLabel for="date" className="form__label">
            Date:
          </FormLabel>
        </FormGroup>

        <FormGroup>
          <ButtonWrapper>
            <LoginButton
              type="submit"
              onClick={handleSubmit(createVisitSubmitHandler)}
            >
              Create visit
            </LoginButton>
          </ButtonWrapper>
        </FormGroup>

        {!correctData ? (
          <FormGroup>
            <ErrorLabel>Uncorrect data passed</ErrorLabel>
          </FormGroup>
        ) : null}

        {/*Old sign in form*/}

        {/* <div className="components-div">
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
          <select onChange={(event) => handleVetChange(event.target.value)}>
            {!isLoading &&
              loadedVets &&
              loadedVets.map((vet) => {
                return (
                  <option
                    key={vet._id}
                    value={vet._id}
                    onSubmit={setValue("vet", vet._id)}
                  >
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
        </div> */}
      </Form>

      {/*Old table*/}
      <Form>
        <NameWrapper>
          <StyledNameLabel>Your visits</StyledNameLabel>
        </NameWrapper>
      </Form>

      <Table>
        <Thead>
          <tr>
            <th>Vet</th>
            <th>Description</th>
            <th>Drugs</th>
            <th>Date</th>
          </tr>
        </Thead>

        <tbody>
          {!isLoading &&
            loadedVisits
              ?.map((v) => {
                return (
                  <Tr key={v.id} id={v.id}>
                    <td>{v.vetName}</td>
                    <td style={{ maxWidth: "280px" }}>{v.description}</td>
                    <td>
                      {v.drugs.map((d) => {
                        return <label>{d}, </label>;
                      })}
                    </td>
                    <td>{v.term}</td>
                  </Tr>
                );
              })
              .reverse()}
        </tbody>
      </Table>
    </UserContent>
  );
};

export default CreateVisit;
