/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import VetContent from "../../shared/components/content/VetContent";
import VisitDetailsPetCard from "../components/VisitDetailsPetCard";

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
  justify-content: right;
  margin-top: 10px;
  padding-right: 30px;
  width: 50%;
  height: 100%;
`;

const ScrollableDiv = styled.div`
  overflow-y: scroll;
  word-wrap: normal;
  width: 100%;
  height: 100%;
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

const MedicinesInfo = styled.div``;

const MedicinesList = styled.div`
  display: flex;
  margin-top: 10px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
`;

const DeleteButton = styled.button`
  width: 20px;
  height: 20px;
  background-color: #dc3545;
  text-align: center;
  padding: 0px;
  margin-left: 10px;
`;

const Description = styled.textarea`
  resize: none;
  font-family: inherit;
  width: 80%;
  height: 80%;
  margin-top: 10px;
  padding: 5px;
  border-radius: 5px;
`;

const AddButton = styled.button`
  margin-left: 10px;
  width: 40px;
  height: 35px;
  font-weight: bold;
`;

const Input = styled.input`
  font-family: inherit;
  margin-left: 10px;
  height: 20px;
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

const SubmitButton = styled.button`
  height: 60px;
  width: 160px;
`;

const VisitDetails = (props) => {
  const location = useLocation();
  const state = location.state;
  const [isPatientDetailsLoading, setIsPatientDetailsLoading] = useState(false);
  const [isVisitDataLoading, setIsVisitDataLoading] = useState(false);
  const [patientDetails, setPatientDetails] = useState();
  const [vaccineList, setVaccineList] = useState([]);
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
        setPatientDetails(responseData.existingPet);
        setPatientDetails((patientDetails) => ({
          ...patientDetails,
          ownerName: state.ownerName,
        }));
        responseData.existingPet.vaccinations.forEach((v) => {
          setVaccineList((vaccineList) => [...vaccineList, v]);
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
    let index = vaccineList.indexOf(v);
    let temp = vaccineList;
    if (index > -1) {
      temp.splice(index, 1);
    }
    setVaccineList(temp);
    setVaccineList((vaccineList) => [...vaccineList]);
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
            vaccinations: vaccineList,
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
                  <Label>Add vaccine:</Label>
                  <Input
                    value={vaccine}
                    onChange={handleVaccineChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") addVaccine();
                    }}
                  />
                  <AddButton onClick={addVaccine}>+</AddButton>
                </InsideWrapper>
                <InsideWrapper>
                  <Label>Add drug:</Label>
                  <Input
                    value={drug}
                    onChange={handleDrugChange}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") addDrug();
                    }}
                  />
                  <AddButton onClick={addDrug}>+</AddButton>
                </InsideWrapper>
              </Wrapper>
              <MedicinesInfo>
                <Label>Vaccines:</Label>
                <ScrollableDiv>
                  {!isPatientDetailsLoading && vaccineList.length > 0
                    ? vaccineList.map((v) => {
                        return (
                          <MedicinesList key={v}>
                            {"- " + v}{" "}
                            <DeleteButton
                              onClick={() => handleVaccineDelete(v)}
                            >
                              -
                            </DeleteButton>
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
                          <MedicinesList key={d}>
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
                <SubmitButton onClick={handleSendData}>
                  Sumbit visit
                </SubmitButton>
              </ButtonWrapper>
            </VisitInfo>
          </ContentWrapper>
        )}
    </VetContent>
  );
};

export default VisitDetails;
