/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { COLORS } from "../../shared/colors";
import { nanoid } from "nanoid";

import UserContent from "../../shared/components/content/UserContent";

import {
  Form,
  FormGroup,
  FormLabel,
  FormInput,
  ButtonWrapper,
  LoginButton,
  ErrorLabel,
  Select,
} from "../../shared/components/forms/formTemplate";

import { Table, Thead, Tr } from "../../shared/components/table/tableTemplate";
import CheckIcon from "../../resources/icons/check-square.svg";
import CancelIcon from "../../resources/icons/x-square.svg";

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

const Edit = styled.button`
  opacity: 0.5;
  transition: 0.5s;
  all: unset;

  width: 20px;
  height: 20px;

  &:hover {
    opacity: 1;
  }
`;

const IconsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 20px);
  gap: 10px;
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
  const [rerender, setRerender] = useState(false);
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
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    getAllClinics();
  }, [location.state.id]);

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

  useEffect(() => {
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
    getPetVisits();
  }, [location.state.id, rerender]);

  const handleVetChange = (data) => {
    setVetId(data);
  };

  const createVisitSubmitHandler = async (data) => {
    const date = data.date;
    const vet = vetId;
    const patient = location.state.id;
    const owner = location.state.owner;

    if (!date || !vet || !patient || !owner || !data.hour) {
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
            hour: data.hour,
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

  const handleStatusChange = async (status, visitId, hour) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/visit/change-visit-status",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            visitId,
            newStatus: status,
            hour,
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
    setRerender(!rerender);
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
                    key={nanoid()}
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
          <FormLabel className="form__label">Date:</FormLabel>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="time"
            className="form__field"
            placeholder="Time"
            name="time"
            id="time"
            {...register("hour")}
          />
          <FormLabel className="form__label">Hour:</FormLabel>
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
      </Form>

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
            <th>Hour</th>
            <th>Status</th>
          </tr>
        </Thead>

        <tbody>
          {!isLoading &&
            loadedVisits
              ?.map((v) => {
                return (
                  <Tr key={v._id} id={v.id}>
                    <td key={nanoid()}>{v.vetName}</td>
                    <td key={nanoid()} style={{ maxWidth: "280px" }}>
                      {v.description}
                    </td>
                    <td key={nanoid()}>
                      {v.drugs.map((d) => {
                        return <label key={nanoid()}>{d}, </label>;
                      })}
                    </td>
                    <td key={nanoid()}>{v.term}</td>
                    <td>{v.hour}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {v.status === "pending" && "pending"}
                      {v.status === "canceled" && "canceled"}
                      {v.status === "submitted" && "submitted"}
                      {v.status === "accepted" && "accepted"}
                      {v.status === "proposition" && (
                        <IconsWrapper>
                          <Edit
                            onClick={() =>
                              handleStatusChange("accepted", v._id)
                            }
                          >
                            <img
                              src={CheckIcon}
                              alt="checkIcon"
                              style={{
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          </Edit>

                          <Edit
                            onClick={() =>
                              handleStatusChange("canceled", v._id)
                            }
                          >
                            <img
                              src={CancelIcon}
                              alt="cancelIcon"
                              style={{
                                width: "20px",
                                height: "20px",
                              }}
                            />
                          </Edit>
                        </IconsWrapper>
                      )}
                    </td>
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
