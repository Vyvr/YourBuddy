/** @format */

import React from "react";
import styled from "styled-components";

import { COLORS } from "../../shared/colors";

const Content = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;

  border-right: 1px solid #f1f2f4;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.1);
  border-image: linear-gradient(rgba(0, 0, 0, 0.1), transparent) 0;

  color: ${COLORS.font};
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 30px;
`;

const InsideContent = styled.div`
  margin-top: 20px;
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
      <InsideContent>
        <Wrapper>
          <img
            src={`http://localhost:5000/${props.patientDetails.image}`}
            alt="pet_profile_pic"
            className="pet-profile-picture"
            style={{
              width: "150px",
              height: "150px",
              border: "none",
              borderRadius: "50%",
            }}
          />
        </Wrapper>
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
            {props.patientDetails.age.year} years{" "}
            {props.patientDetails.age.month} months
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
      </InsideContent>
    </Content>
  );
};

export default VisitDetailsPetCard;
