/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";

import VetContent from "../../shared/components/content/VetContent";
import VisitDetailsPetCard from "../components/VisitDetailsPetCard";
import { COLORS } from "../../shared/colors";
import {
  FormGroup,
  FormLabel,
  FormInput,
  LoginButton,
} from "../../shared/components/forms/formTemplate";

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: right;
  width: 100%;
  height: 100%;
  grid-column: span 2;
`;

const InsideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
  width: 100%;
  height: 100%;
`;

const ScrollableDiv = styled.div`
  overflow-y: scroll;
  word-wrap: normal;
  width: 100%;
  height: 100%;

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
  }

  &::-webkit-scrollbar-thumb:active {
    background: rgba(0, 0, 0, 0.9);
  }
`;

const DescriptionDiv = styled.div`
  display: flex;
  grid-column: span 4;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 100%;
  height: 100%;
`;

const MedicinesInfo = styled.div`
  margin-top: 10px;
`;

const MedicinesList = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: ${COLORS.font};
`;

const DeleteButton = styled.button`
  width: 20px;
  height: 20px;
  margin-left: 10px;
  text-align: center;
  background-color: ${COLORS.font};
  color: white;
  padding: 0px;

  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-weight: 700;
  transition: 0.5s;

  &:hover {
    background-color: #6fb3b8;
  }
`;

const Description = styled.textarea`
  resize: none;
  font-family: inherit;
  width: 80%;
  height: 80%;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 2px solid ${COLORS.font};

  &:focus {
    outline: 0;
    border: 3px solid ${COLORS.font};
  }
`;

const PetInfo = styled.div`
  width: 600px;
  height: 100%;
`;

const VisitInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 25% 60% 15%;
  width: 100%;
  height: 100%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  grid-column: 2 / span 2;
`;

const VisitDetails = (props) => {
  const location = useLocation();
  const state = location.state;
  const [isPatientDetailsLoading, setIsPatientDetailsLoading] = useState(false);
  const [isVisitDataLoading, setIsVisitDataLoading] = useState(false);
  const [patientDetails, setPatientDetails] = useState();
  const [vaccineList, setVaccineList] = useState([]);
  const [vaccineDetails, setVaccineDetails] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [drug, setDrug] = useState("");
  const [vaccine, setVaccine] = useState("");
  const [description, setDescription] = useState("");
  const [visitData, setVisitData] = useState();

  useEffect(() => {
    const getPatientDetails = async () => {
      setIsPatientDetailsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/pet/get-pet-data/" + state.patient
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        if (!responseData.existingPet) {
          setIsPatientDetailsLoading(false);
          return;
        }
        setPatientDetails(responseData.existingPet);
        setPatientDetails((patientDetails) => ({
          ...patientDetails,
          ownerName: state.ownerName,
        }));
        responseData.existingPet.vaccinations.forEach((v) => {
          setVaccineList((vaccineList) => [...vaccineList, v.name]);
          setVaccineDetails((vaccineDetails) => [...vaccineDetails, v]);
        });
      } catch (err) {
        throw new Error(err.message);
      }
      setIsPatientDetailsLoading(false);
    };

    const getVisitData = async () => {
      setIsVisitDataLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/visit/get-visit-details/" + state.id
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setVisitData(responseData.visit);
        responseData.visit.drugs.forEach((d) => {
          setDrugList((drugList) => [...drugList, d]);
        });
        setDescription(responseData.visit.description);
      } catch (err) {
        throw new Error(err.message);
      }
      setIsVisitDataLoading(false);
    };
    getPatientDetails();
    getVisitData();
  }, [state.id, state.ownerName, state.patient]);

  const handleVaccineChange = (e) => {
    setVaccine(e.target.value);
  };

  const addVaccine = () => {
    if (vaccine !== "") {
      setVaccineList((vaccineList) => [...vaccineList, vaccine]);
      setVaccineDetails((vaccineDetails) => [
        ...vaccineDetails,
        { name: vaccine, doctorId: state.vetId },
      ]);
      setVaccine("");
    }
  };

  const handleDrugChange = (e) => {
    setDrug(e.target.value);
  };

  const addDrug = () => {
    if (drug !== "") {
      setDrugList((drugList) => [...drugList, drug]);
      setDrug("");
    }
  };

  const handleVaccineDelete = (v) => {
    let index = vaccineList.indexOf(v.name);
    let indexDetails = vaccineDetails.indexOf(v);
    let temp = vaccineList;
    let tempDetails = vaccineDetails;
    if (index > -1) {
      temp.splice(index, 1);
      tempDetails.splice(indexDetails, 1);
    }
    setVaccineList(temp);
    setVaccineList((vaccineList) => [...vaccineList]);

    setVaccineDetails(tempDetails);
    setVaccineDetails((vaccineDetails) => [...vaccineDetails]);
  };

  const handleDrugDelete = (v) => {
    let index = drugList.indexOf(v);
    let temp = drugList;
    if (index > -1) {
      temp.splice(index, 1);
    }
    setDrugList(temp);
    setDrugList((drugList) => [...drugList]);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSendData = async () => {
    //add drug list, description to visit
    try {
      const response = await fetch(
        "http://localhost:5000/api/visit/edit-visit",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            visitId: state.id,
            drugList: drugList,
            description: description,
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

    //add vaccinations to pet
    try {
      const response = await fetch(
        "http://localhost:5000/api/pet/add-vaccinations",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            petId: state.patient,
            visitId: state.id,
            vaccinations: vaccineList,
            term: state.term,
            vetName: state.vetName,
            vetId: state.vetId,
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

    window.location.reload(false);
  };

  if (!patientDetails) {
    return (
      <VetContent>
        <ContentWrapper>
          <VisitInfo>Pet has been deleted</VisitInfo>
        </ContentWrapper>
      </VetContent>
    );
  }

  return (
    <VetContent>
      {!isPatientDetailsLoading &&
        !isVisitDataLoading &&
        patientDetails &&
        visitData && (
          <ContentWrapper>
            <PetInfo>
              <VisitDetailsPetCard patientDetails={patientDetails} />
            </PetInfo>

            <VisitInfo>
              <Wrapper>
                <InsideWrapper>
                  <FormGroup>
                    <FormInput
                      type="input"
                      className="form__field"
                      placeholder="Add vaccine"
                      name="addVaccine"
                      id="addVaccine"
                      value={vaccine}
                      onChange={handleVaccineChange}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") addVaccine();
                      }}
                    />
                    <FormLabel htmlFor="addVaccine" className="form__label">
                      Add vaccine
                    </FormLabel>
                  </FormGroup>
                  <LoginButton onClick={addVaccine} style={{ width: "40px" }}>
                    +
                  </LoginButton>
                </InsideWrapper>

                <InsideWrapper>
                  <FormGroup>
                    <FormInput
                      type="input"
                      className="form__field"
                      placeholder="Add drug"
                      name="addDrug"
                      id="addDrug"
                      value={drug}
                      onChange={handleDrugChange}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") addDrug();
                      }}
                    />
                    <FormLabel htmlFor="addDrug" className="form_label">
                      Add drug
                    </FormLabel>
                  </FormGroup>
                  <LoginButton onClick={addDrug} style={{ width: "40px" }}>
                    +
                  </LoginButton>
                </InsideWrapper>
              </Wrapper>

              <MedicinesInfo>
                <Label>Vaccines:</Label>
                <ScrollableDiv>
                  {!isPatientDetailsLoading && vaccineList.length > 0
                    ? vaccineDetails.map((v) => {
                        return (
                          <MedicinesList key={nanoid()}>
                            {"-" + v.name}
                            {v.doctorId === state.vetId && (
                              <DeleteButton
                                onClick={() => handleVaccineDelete(v)}
                              >
                                -
                              </DeleteButton>
                            )}
                          </MedicinesList>
                        );
                      })
                    : ""}
                </ScrollableDiv>
              </MedicinesInfo>
              <MedicinesInfo>
                <Label>Drugs:</Label>
                <ScrollableDiv>
                  {!isPatientDetailsLoading && drugList.length > 0
                    ? drugList.map((d) => {
                        return (
                          <MedicinesList key={nanoid()}>
                            {"- " + d}{" "}
                            <DeleteButton onClick={() => handleDrugDelete(d)}>
                              -
                            </DeleteButton>
                          </MedicinesList>
                        );
                      })
                    : ""}
                </ScrollableDiv>
              </MedicinesInfo>
              <DescriptionDiv>
                <Label>Desctiption: </Label>
                <Description
                  value={description}
                  onChange={handleDescriptionChange}
                ></Description>
              </DescriptionDiv>
              <ButtonWrapper>
                <LoginButton
                  onClick={handleSendData}
                  style={{ width: "160px", height: "60px" }}
                >
                  Sumbit visit
                </LoginButton>
              </ButtonWrapper>
            </VisitInfo>
          </ContentWrapper>
        )}
    </VetContent>
  );
};

export default VisitDetails;
