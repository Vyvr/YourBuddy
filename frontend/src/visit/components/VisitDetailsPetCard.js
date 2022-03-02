/** @format */

import React from "react";
import styled from "styled-components";

import { COLORS } from "../../shared/colors";

const Content = styled.div`
  height: 100%;
  border-right: 1px solid black;
  color: ${COLORS.font};
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 15px;
  text-align: center;
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
        <InfoData key="age">
          {props.patientDetails.age.year} years {props.patientDetails.age.month}{" "}
          months
        </InfoData>
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
