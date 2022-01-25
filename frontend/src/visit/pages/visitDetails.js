/** @format */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import VetContent from "../../shared/components/content/VetContent";

import "./visitList.css";

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
  grid-template-rows: 25% 75%;
  width: 100%;
  height: 100%;
`;

const VisitDetails = (props) => {
  const location = useLocation();
  const state = location.state;
  const [isLoading, setIsLoading] = useState();
  const [patientDetails, setPatientDetails] = useState();
  const [vaccineList, setVaccineList] = useState([]);
  const [drugList, setDrugList] = useState([]);
  const [drug, setDrug] = useState("");
  const [vaccine, setVaccine] = useState("");

  useEffect(() => {
    const getPatientDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "http://localhost:5000/api/pet/get-pet-data/" + state.patient
        );
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setPatientDetails(responseData.existingPet);
      } catch (err) {
        throw new Error(err.message);
      }
      setIsLoading(false);
    };
    getPatientDetails();
  }, []);

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

  return (
    <VetContent>
      {!isLoading && patientDetails && (
        <ContentWrapper>
          <PetInfo>
            <div key="name">{patientDetails.name}</div>
            <div key="age">age: {patientDetails.age}</div>
            <div key="breed">Breed: {patientDetails.breed}</div>
            <div key="weight">Weight: {patientDetails.weight}</div>
            <div key="vaccines">
              Vaccines:
              {patientDetails.vaccinations.length > 0
                ? patientDetails.vaccinations.map((v) => {
                    return (
                      <div key={v}>
                        <span key={v}>{v + ", "}</span>
                      </div>
                    );
                  })
                : ""}
            </div>
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
                {!isLoading && vaccineList.length > 0
                  ? vaccineList.map((v) => {
                      return (
                        <MedicinesList key={v}>
                          {"- " + v}{" "}
                          <DeleteButton onClick={() => handleVaccineDelete(v)}>
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
                {!isLoading && drugList.length > 0
                  ? drugList.map((d) => {
                      return (
                        <MedicinesList>
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
              <Description></Description>
            </DescriptionDiv>
          </VisitInfo>
        </ContentWrapper>
      )}
    </VetContent>
  );
};

export default VisitDetails;
