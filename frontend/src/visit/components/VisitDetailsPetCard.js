/** @format */

import React from "react";
import styled from "styled-components";

const Content = styled.div`
  height: 100%;
  border-right: 1px solid black;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  text-align: center;
  border-bottom: 1px solid black;
`;
const InfoHeader = styled.label`
  font-size: 20px;
  font-weight: bold;
`;
const InfoData = styled.label`
  font-size: 18px;
`;

const VisitDetailsPetCard = (props) => {
  return (
    <Content>
      <Wrapper>
        <InfoHeader>Patient</InfoHeader>
        <InfoData key="name">{props.patientDetails.name}</InfoData>
      </Wrapper>
      <Wrapper>
        <InfoHeader>Owner</InfoHeader>
        <InfoData key="owner">{props.patientDetails.ownerName}</InfoData>
      </Wrapper>
      <Wrapper>
        <InfoHeader>Age</InfoHeader>
        <InfoData key="age">{props.patientDetails.age}</InfoData>
      </Wrapper>
      <Wrapper>
        <InfoHeader>Breed</InfoHeader>
        <InfoData key="breed">{props.patientDetails.breed}</InfoData>
      </Wrapper>
      <Wrapper>
        <InfoHeader>Weight</InfoHeader>
        <InfoData key="weight">{props.patientDetails.weight} kg</InfoData>
      </Wrapper>{" "}
      <Wrapper>
        <InfoHeader>Sex</InfoHeader>
        <InfoData key="weight">{props.patientDetails.sex}</InfoData>
      </Wrapper>
      <Wrapper>
        <InfoHeader>Vaccines</InfoHeader>
        <InfoData key="vaccines">
          {props.patientDetails.vaccinations.length > 0
            ? props.patientDetails.vaccinations.map((v) => {
                return (
                  <div key={v._id}>
                    <span key={v._id}>{v.name + ", "}</span>
                  </div>
                );
              })
            : ""}
        </InfoData>
      </Wrapper>
    </Content>
  );
};

export default VisitDetailsPetCard;
